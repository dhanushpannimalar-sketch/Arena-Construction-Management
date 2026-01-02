import { useApp } from './context/AppContext';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/Projects';
import { ProjectDetail } from './components/ProjectDetail';
import { Materials } from './components/Materials';
import { Suppliers } from './components/Suppliers';
import { Workers } from './components/Workers';
import { Schedule } from './components/Schedule';
import { DailyReports } from './components/DailyReports';
import { WorkDoneReports } from './components/WorkDoneReports';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';

function App() {
  const { user, currentView } = useApp();

  if (!user) {
    return <Login />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'project-detail':
        return <ProjectDetail />;
      case 'materials':
        return <Materials />;
      case 'suppliers':
        return <Suppliers />;
      case 'workers':
        return <Workers />;
      case 'schedule':
        return <Schedule />;
      case 'daily-reports':
        return <DailyReports />;
      case 'work-done-reports':
        return <WorkDoneReports />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return <Layout>{renderView()}</Layout>;
}

export default App;
