import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import { mockActivities } from '../../data/mockData';

const ActivityFeed: React.FC = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {mockActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3"
          >
            <Avatar
              src={activity.user.avatar}
              alt={activity.user.name}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user.name}</span>{' '}
                {activity.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
        View all activity
      </button>
    </Card>
  );
};

export default ActivityFeed;