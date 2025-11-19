/*
 * Fast Text Processor for HelixDesk
 * High-performance search and filtering utility
 * Compile: g++ -std=c++17 -O3 text_processor.cpp -o text_processor
 */

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>
#include <sstream>
#include <unordered_map>
#include <chrono>

class TextProcessor {
private:
    std::string text;
    
    // Convert string to lowercase for case-insensitive operations
    std::string toLowerCase(const std::string& str) const {
        std::string result = str;
        std::transform(result.begin(), result.end(), result.begin(),
                      [](unsigned char c){ return std::tolower(c); });
        return result;
    }
    
public:
    TextProcessor(const std::string& input) : text(input) {}
    
    // Fast fuzzy search with scoring
    std::vector<std::pair<int, std::string>> fuzzySearch(
        const std::vector<std::string>& items,
        const std::string& query,
        int maxResults = 10
    ) {
        std::vector<std::pair<int, std::string>> results;
        std::string lowerQuery = toLowerCase(query);
        
        for (const auto& item : items) {
            std::string lowerItem = toLowerCase(item);
            int score = 0;
            
            // Exact match bonus
            if (lowerItem == lowerQuery) {
                score += 1000;
            }
            
            // Starts with query bonus
            if (lowerItem.find(lowerQuery) == 0) {
                score += 500;
            }
            
            // Contains query bonus
            if (lowerItem.find(lowerQuery) != std::string::npos) {
                score += 250;
            }
            
            // Character match scoring
            size_t queryPos = 0;
            for (size_t i = 0; i < lowerItem.length() && queryPos < lowerQuery.length(); ++i) {
                if (lowerItem[i] == lowerQuery[queryPos]) {
                    score += 10;
                    queryPos++;
                }
            }
            
            // Only include if there's some match
            if (score > 0) {
                results.push_back({score, item});
            }
        }
        
        // Sort by score descending
        std::sort(results.begin(), results.end(),
                 [](const auto& a, const auto& b) { return a.first > b.first; });
        
        // Return top results
        if (results.size() > static_cast<size_t>(maxResults)) {
            results.resize(maxResults);
        }
        
        return results;
    }
    
    // Word frequency analysis
    std::unordered_map<std::string, int> getWordFrequency() const {
        std::unordered_map<std::string, int> frequency;
        std::istringstream stream(toLowerCase(text));
        std::string word;
        
        while (stream >> word) {
            // Remove punctuation
            word.erase(std::remove_if(word.begin(), word.end(),
                      [](char c) { return !std::isalnum(c); }),
                      word.end());
            
            if (!word.empty()) {
                frequency[word]++;
            }
        }
        
        return frequency;
    }
    
    // Extract keywords (most frequent non-common words)
    std::vector<std::pair<std::string, int>> extractKeywords(int limit = 10) const {
        // Common words to filter out
        std::vector<std::string> stopWords = {
            "the", "is", "at", "which", "on", "a", "an", "and", "or",
            "but", "in", "with", "to", "for", "of", "as", "by", "from"
        };
        
        auto frequency = getWordFrequency();
        std::vector<std::pair<std::string, int>> keywords;
        
        for (const auto& [word, count] : frequency) {
            // Skip stop words and short words
            if (word.length() > 3 &&
                std::find(stopWords.begin(), stopWords.end(), word) == stopWords.end()) {
                keywords.push_back({word, count});
            }
        }
        
        // Sort by frequency
        std::sort(keywords.begin(), keywords.end(),
                 [](const auto& a, const auto& b) { return a.second > b.second; });
        
        if (keywords.size() > static_cast<size_t>(limit)) {
            keywords.resize(limit);
        }
        
        return keywords;
    }
    
    // Calculate reading time estimate
    double estimateReadingTime() const {
        std::istringstream stream(text);
        int wordCount = 0;
        std::string word;
        
        while (stream >> word) {
            wordCount++;
        }
        
        // Average reading speed: 200 words per minute
        return static_cast<double>(wordCount) / 200.0;
    }
};

// Demo function
void runDemo() {
    std::cout << "=== HelixDesk Text Processor Demo ===\n\n";
    
    // Sample task titles
    std::vector<std::string> tasks = {
        "Implement user authentication system",
        "Fix responsive design issues",
        "Add customer dashboard",
        "Optimize database queries",
        "Create onboarding flow",
        "Update documentation",
        "Refactor authentication module",
        "Add unit tests",
        "Implement real-time notifications"
    };
    
    TextProcessor processor("");
    
    // Fuzzy search demo
    std::string query = "auth";
    std::cout << "Fuzzy search for '" << query << "':\n";
    auto results = processor.fuzzySearch(tasks, query, 5);
    
    for (size_t i = 0; i < results.size(); ++i) {
        std::cout << (i + 1) << ". " << results[i].second
                  << " (score: " << results[i].first << ")\n";
    }
    
    std::cout << "\n";
    
    // Text analysis demo
    std::string sampleText = 
        "The kanban board helps teams visualize workflow and optimize delivery. "
        "Tasks move through different stages from backlog to completion. "
        "The system provides insights and analytics to improve team performance.";
    
    TextProcessor analyzer(sampleText);
    
    std::cout << "Text Analysis:\n";
    std::cout << "Reading time: " << analyzer.estimateReadingTime() 
              << " minutes\n\n";
    
    std::cout << "Top keywords:\n";
    auto keywords = analyzer.extractKeywords(5);
    for (const auto& [word, count] : keywords) {
        std::cout << "  - " << word << " (" << count << " times)\n";
    }
}

int main(int argc, char* argv[]) {
    auto start = std::chrono::high_resolution_clock::now();
    
    if (argc > 1 && std::string(argv[1]) == "--demo") {
        runDemo();
    } else {
        std::cout << "HelixDesk Text Processor\n";
        std::cout << "Usage: text_processor --demo\n";
        std::cout << "\nFeatures:\n";
        std::cout << "  - Fast fuzzy search\n";
        std::cout << "  - Keyword extraction\n";
        std::cout << "  - Reading time estimation\n";
        std::cout << "  - Word frequency analysis\n";
    }
    
    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    std::cout << "\nExecution time: " << duration.count() << " microseconds\n";
    
    return 0;
}
