import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ReportIcon from '@mui/icons-material/Report';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ClientTable from './ClientTable';
import SellersTable from './SellersTable'; // Import the SellersTable component
import axios from 'axios';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Admin Dashboard',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Manage Registered Clients',
  },
  {
    segment: 'Clients',
    title: 'Clients',
    icon: <GroupIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Manage Registered Sellers',
  },
  {
    segment: 'Sellers',
    title: 'Sellers',
    icon: <GroupIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Issues',
  },
  {
    segment: 'Reports',
    title: 'Reports',
    icon: <ReportIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  const handleDelete = async (type, id) => {
    try {
      await axios.delete(`http://localhost:3100/api/admin/${type}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('umia')}`,
        },
      });
      // Optionally, refresh data here
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSwitchRole = async (type, id, newRole) => {
    try {
      await axios.put(`http://localhost:3100/api/admin/switch-role/${id}`, { newRole }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('umia')}`,
        },
      });
      // Optionally, refresh data here
    } catch (error) {
      console.error('Error switching role:', error);
    }
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {pathname === '/Clients' && (
        <ClientTable
          onDelete={handleDelete}
          onSwitchRole={handleSwitchRole}
        />
      )}
      {pathname === '/Sellers' && (
        <SellersTable
          onDelete={handleDelete}
          onSwitchRole={handleSwitchRole}
        />
      )}
      {pathname === '/dashboard' && (
        <Typography>Dashboard content for {pathname}</Typography>
      )}
      {/* You can add more conditional rendering based on the pathname */}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
