import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Calendar, Award, Search, UserPlus } from 'lucide-react';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import BackButton from '../ui/BackButton';
import { TeamMember } from '../../types';

interface TeamViewProps {
  onBack: () => void;
  users: any[];
}

const TeamView: React.FC<TeamViewProps> = ({ onBack, users }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const teamMembers: TeamMember[] = users.map((user: any) => ({
    ...user,
    joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    projectsCount: Math.floor(Math.random() * 10) + 1,
    tasksCompleted: Math.floor(Math.random() * 50) + 5,
  }));

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'error';
      case 'manager': return 'warning';
      case 'member': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="p-6">
      <BackButton onClick={onBack} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your team members and their roles</p>
        </div>
        <Button icon={UserPlus} size="md">
          Invite Member
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="lg:col-span-3 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{teamMembers.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Members</div>
        </Card>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <Avatar src={member.avatar} alt={member.name} size="lg" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {member.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <Badge variant={getRoleBadgeVariant(member.role)} className="capitalize">
                  {member.role}
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Joined {member.joinedAt.toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {member.projectsCount}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {member.tasksCompleted}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Tasks Done</div>
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Last active {member.lastActive.toLocaleDateString()}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No team members found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria</p>
        </motion.div>
      )}
    </div>
  );
};

export default TeamView;