import React from 'react';
import { MapPin, Users, Shield, Battery, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import TrackingMap from './TrackingMap';
import AddChildDialog from './AddChildDialog';
import EmergencyAlertDialog from './EmergencyAlertDialog';
import ExportDataDialog from './ExportDataDialog';
import ChildDetailsDialog from './ChildDetailsDialog';
import { useWallet } from 'src/hooks/useWallet';
import { useContract } from 'src/hooks/useContract';
import { CONTRACT_CONFIG } from 'src/lib/contract-config';

interface Child {
  id: number;
  name: string;
  age: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'safe' | 'warning' | 'danger';
  lastSeen: string;
  battery: number;
  isOnline: boolean;
}

interface DashboardProps {
  children: Child[];
  onAddChild?: (child: Child) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ children, onAddChild }) => {
  const safeChildren = children.filter(child => child.status === 'safe').length;
  const warningChildren = children.filter(child => child.status === 'warning').length;
  const onlineChildren = children.filter(child => child.isOnline).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-status-safe';
      case 'warning': return 'text-status-warning';
      case 'danger': return 'text-status-danger';
      default: return 'text-muted-foreground';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-status-safe';
    if (battery > 20) return 'text-status-warning';
    return 'text-status-danger';
  };

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your children's safety and location in real-time</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="sana-card">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-primary/20 glow-primary">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{children.length}</p>
              <p className="text-sm text-muted-foreground">Total Children</p>
            </div>
          </div>
        </div>

        <div className="sana-card">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-status-safe/20 glow-success">
              <Shield className="w-6 h-6 text-status-safe" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{safeChildren}</p>
              <p className="text-sm text-muted-foreground">Safe</p>
            </div>
          </div>
        </div>

        <div className="sana-card">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-status-warning/20">
              <AlertTriangle className="w-6 h-6 text-status-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{warningChildren}</p>
              <p className="text-sm text-muted-foreground">Warnings</p>
            </div>
          </div>
        </div>

        <div className="sana-card">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-cyber-cyan/20 glow-cyan">
              <Wifi className="w-6 h-6 text-cyber-cyan" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{onlineChildren}</p>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Children Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {children.map((child) => (
          <div key={child.id} className="sana-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{child.name}</h3>
                <p className="text-sm text-muted-foreground">Age {child.age}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  child.status === 'safe' ? 'bg-status-safe glow-success' :
                  child.status === 'warning' ? 'bg-status-warning' :
                  'bg-status-danger'
                }`}></div>
                <span className={`text-sm font-medium ${getStatusColor(child.status)}`}>
                  {child.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{child.location.address}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Battery className={`w-4 h-4 ${getBatteryColor(child.battery)}`} />
                  <span className={`text-sm ${getBatteryColor(child.battery)}`}>
                    {child.battery}%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {child.isOnline ? (
                    <Wifi className="w-4 h-4 text-status-safe" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {child.lastSeen}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <ChildDetailsDialog 
                child={child}
                trigger={
                  <button className="btn-secondary w-full">
                    View Details
                  </button>
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Map */}
      <div className="mb-8">
        <TrackingMap children={children} height="h-[500px]" />
      </div>

      {/* Quick Actions */}
      <div className="sana-card">
        <div className="sana-card-header">
          <h3 className="text-xl font-semibold text-foreground">Quick Actions</h3>
        </div>
        <div className="sana-card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AddChildDialog onAddChild={onAddChild || (() => {})} />
            <EmergencyAlertDialog children={children} />
            <ExportDataDialog children={children} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;