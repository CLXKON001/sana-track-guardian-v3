import React, { useState } from 'react';
import { AlertTriangle, Phone, MessageSquare, MapPin, Clock, Users } from 'lucide-react';

const EmergencyAccess: React.FC = () => {
  const [emergencyContacts] = useState([
    { id: 1, name: 'Local Police', phone: '+27-10-201-0000', type: 'police' },
    { id: 2, name: 'Sarah Johnson (Mom)', phone: '+27-82-123-4567', type: 'family' },
    { id: 3, name: 'Mike Smith (Dad)', phone: '+27-83-987-6543', type: 'family' },
    { id: 4, name: 'Emergency Services', phone: '10177', type: 'emergency' }
  ]);

  const [recentAlerts] = useState([
    {
      id: 1,
      child: 'Emma Johnson',
      type: 'location',
      message: 'Unusual location detected - outside safe zone',
      timestamp: '2 minutes ago',
      severity: 'warning'
    },
    {
      id: 2,
      child: 'Sophia Brown',
      type: 'battery',
      message: 'Low battery warning - 20% remaining',
      timestamp: '15 minutes ago',
      severity: 'warning'
    }
  ]);

  const handleEmergencyCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmergencyAlert = () => {
    // Simulate emergency alert
    alert('Emergency alert sent to all contacts!');
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'police': return '🚔';
      case 'emergency': return '🚨';
      case 'family': return '👨‍👩‍👧‍👦';
      default: return '📞';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'warning': return 'text-status-warning bg-status-warning/10 border-status-warning/20';
      case 'danger': return 'text-status-danger bg-status-danger/10 border-status-danger/20';
      default: return 'text-muted-foreground bg-secondary/50 border-border/20';
    }
  };

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Emergency Access</h1>
        <p className="text-muted-foreground">Quick access to emergency contacts and alerts</p>
      </div>

      {/* Emergency Alert Button */}
      <div className="sana-card mb-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-status-danger/20 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-status-danger" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Emergency Alert</h2>
          <p className="text-muted-foreground">
            Send immediate alert to all emergency contacts about all children
          </p>
        </div>
        
        <button 
          onClick={handleEmergencyAlert}
          className="btn-primary bg-status-danger hover:bg-status-danger/80 text-white px-8 py-4 text-lg"
        >
          SEND EMERGENCY ALERT
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emergency Contacts */}
        <div className="sana-card">
          <div className="sana-card-header">
            <h3 className="text-xl font-semibold text-foreground">Emergency Contacts</h3>
          </div>
          <div className="sana-card-content space-y-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getContactIcon(contact.type)}</div>
                  <div>
                    <p className="font-medium text-foreground">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEmergencyCall(contact.phone)}
                    className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyber-cyan transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="sana-card">
          <div className="sana-card-header">
            <h3 className="text-xl font-semibold text-foreground">Recent Alerts</h3>
          </div>
          <div className="sana-card-content space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{alert.child}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
                <p className="text-sm">{alert.message}</p>
                <div className="mt-3 flex space-x-2">
                  <button 
                    onClick={() => window.location.href = '/?focus=' + encodeURIComponent(alert.child)}
                    className="btn-secondary text-xs px-3 py-1 flex items-center space-x-1"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>View Location</span>
                  </button>
                  <button 
                    onClick={() => window.location.href = `tel:+27-82-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`}
                    className="btn-secondary text-xs px-3 py-1 flex items-center space-x-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Contact Child</span>
                  </button>
                </div>
              </div>
            ))}
            
            {recentAlerts.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-status-safe/20 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-status-safe" />
                </div>
                <p className="text-muted-foreground">No recent alerts</p>
                <p className="text-sm text-muted-foreground">All children are safe</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="sana-card mt-8">
        <div className="sana-card-header">
          <h3 className="text-xl font-semibold text-foreground">Quick Emergency Actions</h3>
        </div>
        <div className="sana-card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn-secondary flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Track All Children</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call All Children</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Send Safe Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAccess;