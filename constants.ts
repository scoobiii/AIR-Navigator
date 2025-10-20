import type { ServiceEvent, ServiceStatus } from './types';

export const MOCK_EVENTS: ServiceEvent[] = [
  {
    id: '1',
    service: 'Amazon Elastic Compute Cloud (EC2)',
    region: 'N. Virginia (us-east-1)',
    description: 'We are investigating increased API error rates and latencies for Amazon EC2 instances in a single Availability Zone (USE1-AZ4) in the US-EAST-1 Region. Other Availability Zones are not affected.',
    startTime: 'Jul 26, 2024, 10:30 AM PDT',
    lastUpdateTime: 'Jul 26, 2024, 11:15 AM PDT',
    severity: 'Degradation',
    rawLog: `Jul 26 10:30 AM PDT [Informational] We are investigating increased API error rates for Amazon EC2 in the US-EAST-1 Region.\nJul 26 10:45 AM PDT [Investigating] We have identified the root cause of the increased API error rates to be a networking issue in a single Availability Zone (USE1-AZ4). We are working to resolve the issue.\nJul 26 11:15 AM PDT [Update] We are seeing signs of recovery for the affected EC2 instances. We continue to monitor the situation.`,
    affectedServices: {
      impacted: ['EC2 API', 'EC2 Instance Health Checks', 'Auto Scaling'],
      resolved: [],
    },
  },
  {
    id: '2',
    service: 'Amazon Relational Database Service (RDS)',
    region: 'Oregon (us-west-2)',
    description: 'We are investigating connectivity issues for a small number of RDS database instances in the US-WEST-2 Region. The impact is limited to instances in a single Availability Zone.',
    startTime: 'Jul 26, 2024, 8:00 AM PDT',
    lastUpdateTime: 'Jul 26, 2024, 9:05 AM PDT',
    severity: 'Disruption',
    rawLog: `Jul 26 8:00 AM PDT [Informational] We have received reports of intermittent connectivity issues for some RDS instances.\nJul 26 8:20 AM PDT [Investigating] We can confirm connectivity issues for RDS instances in Availability Zone USW2-AZ1. The issue seems to stem from a storage subsystem failure.\nJul 26 9:05 AM PDT [Resolved] The underlying storage issue has been resolved. All RDS instances are now operating normally.`,
    affectedServices: {
      impacted: [],
      resolved: ['RDS DB Instances (PostgreSQL)', 'RDS DB Instances (MySQL)'],
    }
  },
];

export const MOCK_SERVICE_STATUS: ServiceStatus[] = [
    { name: 'Amazon Elastic Compute Cloud (EC2)', status: 'disrupted' },
    { name: 'Amazon Simple Storage Service (S3)', status: 'ok' },
    { name: 'Amazon Relational Database Service (RDS)', status: 'ok' },
    { name: 'Amazon DynamoDB', status: 'ok' },
    { name: 'AWS Lambda', status: 'ok' },
    { name: 'Amazon Virtual Private Cloud (VPC)', status: 'ok' },
];
