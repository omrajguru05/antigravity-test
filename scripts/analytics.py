"""
Kanban Board Analytics Engine
Analyzes task data and generates insights for HelixDesk
"""

import json
import sys
from datetime import datetime, timedelta
from typing import Dict, List, Any
from collections import defaultdict


class KanbanAnalytics:
    """Analyzes Kanban board data to generate actionable insights"""
    
    def __init__(self, data_path: str = None):
        self.data_path = data_path
        self.tasks = []
        
    def load_data(self, json_data: str = None):
        """Load task data from JSON string or file"""
        if json_data:
            self.tasks = json.loads(json_data)
        elif self.data_path:
            with open(self.data_path, 'r') as f:
                self.tasks = json.load(f)
        else:
            raise ValueError("No data source provided")
    
    def calculate_velocity(self, days: int = 7) -> Dict[str, Any]:
        """Calculate team velocity - tasks completed per day"""
        completed_tasks = [t for t in self.tasks if t.get('status') == 'done']
        
        # Group by completion date
        daily_completions = defaultdict(int)
        for task in completed_tasks:
            if 'completedAt' in task:
                date = task['completedAt'].split('T')[0]
                daily_completions[date] += 1
        
        if daily_completions:
            avg_velocity = sum(daily_completions.values()) / len(daily_completions)
        else:
            avg_velocity = 0
            
        return {
            'average_daily_velocity': round(avg_velocity, 2),
            'total_completed': len(completed_tasks),
            'daily_breakdown': dict(daily_completions)
        }
    
    def identify_bottlenecks(self) -> Dict[str, Any]:
        """Identify columns with high WIP (work in progress)"""
        column_counts = defaultdict(int)
        
        for task in self.tasks:
            status = task.get('status', 'unknown')
            column_counts[status] += 1
        
        # Find columns with high task density
        total_tasks = len(self.tasks)
        bottlenecks = []
        
        for column, count in column_counts.items():
            percentage = (count / total_tasks * 100) if total_tasks > 0 else 0
            if percentage > 40 and column != 'done':  # More than 40% in one column
                bottlenecks.append({
                    'column': column,
                    'task_count': count,
                    'percentage': round(percentage, 1)
                })
        
        return {
            'bottlenecks': bottlenecks,
            'column_distribution': dict(column_counts)
        }
    
    def calculate_priority_distribution(self) -> Dict[str, int]:
        """Analyze task distribution by priority"""
        priority_counts = defaultdict(int)
        
        for task in self.tasks:
            priority = task.get('priority', 'medium')
            priority_counts[priority] += 1
        
        return dict(priority_counts)
    
    def generate_insights(self) -> Dict[str, Any]:
        """Generate comprehensive insights report"""
        velocity = self.calculate_velocity()
        bottlenecks = self.identify_bottlenecks()
        priorities = self.calculate_priority_distribution()
        
        # Generate recommendations
        recommendations = []
        
        if velocity['average_daily_velocity'] < 2:
            recommendations.append({
                'type': 'velocity',
                'severity': 'medium',
                'message': 'Team velocity is below optimal. Consider reviewing task complexity.'
            })
        
        if bottlenecks['bottlenecks']:
            for bottleneck in bottlenecks['bottlenecks']:
                recommendations.append({
                    'type': 'bottleneck',
                    'severity': 'high',
                    'message': f"Bottleneck detected in '{bottleneck['column']}' with {bottleneck['task_count']} tasks"
                })
        
        high_priority_count = priorities.get('high', 0)
        total_tasks = sum(priorities.values())
        if high_priority_count / total_tasks > 0.5 if total_tasks > 0 else False:
            recommendations.append({
                'type': 'priorities',
                'severity': 'medium',
                'message': 'Too many high-priority tasks. Consider re-evaluating priorities.'
            })
        
        return {
            'velocity': velocity,
            'bottlenecks': bottlenecks,
            'priority_distribution': priorities,
            'recommendations': recommendations,
            'total_tasks': len(self.tasks),
            'generated_at': datetime.now().isoformat()
        }


def main():
    """CLI interface for analytics"""
    if len(sys.argv) < 2:
        print("Usage: python analytics.py <path_to_tasks.json>")
        sys.exit(1)
    
    analytics = KanbanAnalytics(sys.argv[1])
    analytics.load_data()
    insights = analytics.generate_insights()
    
    print(json.dumps(insights, indent=2))


if __name__ == "__main__":
    main()
