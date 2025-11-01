import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Globe, Save } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import BackButton from '../ui/BackButton';
import Avatar from '../ui/Avatar';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface SettingsViewProps {
  onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const [settings, setSettings] = useLocalStorage('app_settings', {
    notifications: {
      email: true,
      push: true,
      desktop: false,
    },
    appearance: {
      theme: 'light',
      language: 'en',
    },
    privacy: {
      profileVisible: true,
      activityVisible: true,
    },
  });

  const [profile, setProfile] = useState({
    name: 'Sarah Chen',
    email: 'sarah@projectflow.com',
    bio: 'Product Manager at ProjectFlow',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  });

  const handleSaveSettings = () => {
    setSettings(settings);
    // Show success message
    alert('Settings saved successfully!');
  };

  const SettingSection: React.FC<{
    title: string;
    description: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }> = ({ title, description, icon: Icon, children }) => (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      {children}
    </Card>
  );

  const ToggleSwitch: React.FC<{
    label: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }> = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {description && (
          <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <BackButton onClick={onBack} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account and application preferences</p>
        </div>
        <Button icon={Save} onClick={handleSaveSettings}>
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <SettingSection
          title="Profile"
          description="Manage your personal information"
          icon={User}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar src={profile.avatar} alt={profile.name} size="xl" />
              <div className="flex-1">
                <Button variant="secondary" size="sm">
                  Change Avatar
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="input-field resize-none"
                rows={3}
              />
            </div>
          </div>
        </SettingSection>

        {/* Notification Settings */}
        <SettingSection
          title="Notifications"
          description="Configure how you receive notifications"
          icon={Bell}
        >
          <div className="space-y-1">
            <ToggleSwitch
              label="Email Notifications"
              description="Receive notifications via email"
              checked={settings.notifications.email}
              onChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email: checked },
                })
              }
            />
            <ToggleSwitch
              label="Push Notifications"
              description="Receive push notifications in your browser"
              checked={settings.notifications.push}
              onChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, push: checked },
                })
              }
            />
            <ToggleSwitch
              label="Desktop Notifications"
              description="Show desktop notifications when app is closed"
              checked={settings.notifications.desktop}
              onChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, desktop: checked },
                })
              }
            />
          </div>
        </SettingSection>

        {/* Appearance Settings */}
        <SettingSection
          title="Appearance"
          description="Customize the look and feel"
          icon={Palette}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <select
                value={settings.appearance.theme}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    appearance: { ...settings.appearance, theme: e.target.value },
                  })
                }
                className="input-field"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={settings.appearance.language}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    appearance: { ...settings.appearance, language: e.target.value },
                  })
                }
                className="input-field"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </SettingSection>

        {/* Privacy Settings */}
        <SettingSection
          title="Privacy"
          description="Control your privacy and data sharing"
          icon={Shield}
        >
          <div className="space-y-1">
            <ToggleSwitch
              label="Profile Visibility"
              description="Make your profile visible to other team members"
              checked={settings.privacy.profileVisible}
              onChange={(checked) =>
                setSettings({
                  ...settings,
                  privacy: { ...settings.privacy, profileVisible: checked },
                })
              }
            />
            <ToggleSwitch
              label="Activity Visibility"
              description="Show your activity in team feeds"
              checked={settings.privacy.activityVisible}
              onChange={(checked) =>
                setSettings({
                  ...settings,
                  privacy: { ...settings.privacy, activityVisible: checked },
                })
              }
            />
          </div>
        </SettingSection>
      </div>
    </div>
  );
};

export default SettingsView;