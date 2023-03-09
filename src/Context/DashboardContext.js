import { createContext } from 'react';
import { DashboardPublisher } from '@dash/Dashboard';

export const DashboardContext = createContext({ pub: DashboardPublisher });