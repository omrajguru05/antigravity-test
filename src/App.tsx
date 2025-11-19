import { useUserStore } from './store/userStore';
import { useNavigationStore } from './store/navigationStore';
import AppShell from './components/layout/AppShell';
import Onboarding from './components/onboarding/Onboarding';
import GuidedTour from './components/guide/GuidedTour';
import { TodayPage, CustomersPage, WorkPage, SystemsPage } from './pages';

function App() {
  const { isOnboarded } = useUserStore();
  const { currentPage } = useNavigationStore();

  // Show onboarding if user has not completed it
  if (!isOnboarded) {
    return <Onboarding />;
  }

  // Render current page based on navigation state
  const renderPage = () => {
    switch (currentPage) {
      case 'today':
        return <TodayPage />;
      case 'customers':
        return <CustomersPage />;
      case 'work':
        return <WorkPage />;
      case 'systems':
        return <SystemsPage />;
      default:
        return <TodayPage />;
    }
  };

  return (
    <>
      <AppShell>{renderPage()}</AppShell>
      <GuidedTour />
    </>
  );
}

export default App;
