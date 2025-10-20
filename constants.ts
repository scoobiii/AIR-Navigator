import type { ServiceEvent } from './types';

export const SERVICE_EVENTS: ServiceEvent[] = [
  {
    id: 1,
    service: 'Multiple services',
    description: 'Increased Error Rates and Latencies',
    region: 'N. Virginia (us-east-1)',
    startTime: 'Oct 20, 12:11 AM PDT',
    lastUpdateTime: 'Oct 20, 10:03 AM PDT',
    severity: 'Degraded',
    rawLog: `Oct 20 10:03 AM PDT We continue to apply mitigation steps for network load balancer health and recovering connectivity for most AWS services. Lambda is experiencing function invocation errors because an internal subsystem was impacted by the network load balancer health checks. We are taking steps to recover this internal Lambda system. For EC2 launch instance failures, we are in the process of validating a fix and will deploy to the first AZ as soon as we have confidence we can do so safely. We will provide an update by 10:45 AM PDT.
Oct 20 9:13 AM PDT We have taken additional mitigation steps to aid the recovery of the underlying internal subsystem responsible for monitoring the health of our network load balancers and are now seeing connectivity and API recovery for AWS services. We have also identified and are applying next steps to mitigate throttling of new EC2 instance launches. We will provide an update by 10:00 AM PDT.
Oct 20 8:43 AM PDT We have narrowed down the source of the network connectivity issues that impacted AWS Services. The root cause is an underlying internal subsystem responsible for monitoring the health of our network load balancers. We are throttling requests for new EC2 instance launches to aid recovery and actively working on mitigations.
Oct 20 8:04 AM PDT We continue to investigate the root cause for the network connectivity issues that are impacting AWS services such as DynamoDB, SQS, and Amazon Connect in the US-EAST-1 Region. We have identified that the issue originated from within the EC2 internal network. We continue to investigate and identify mitigations.
Oct 20 7:29 AM PDT We have confirmed multiple AWS services experienced network connectivity issues in the US-EAST-1 Region. We are seeing early signs of recovery for the connectivity issues and are continuing to investigate the root cause.
Oct 20 7:14 AM PDT We can confirm significant API errors and connectivity issues across multiple services in the US-EAST-1 Region. We are investigating and will provide further update in 30 minutes or soon if we have additional information.
Oct 20 6:42 AM PDT We have applied multiple mitigations across multiple Availability Zones (AZs) in US-EAST-1 and are still experiencing elevated errors for new EC2 instance launches. We are rate limiting new instance launches to aid recovery. We will provide an update at 7:30 AM PDT or sooner if we have additional information.
Oct 20 5:48 AM PDT We are making progress on resolving the issue with new EC2 instance launches in the US-EAST-1 Region and are now able to successfully launch new instances in some Availability Zones. We are applying similar mitigations to the remaining impacted Availability Zones to restore new instance launches. As we continue to make progress, customers will see an increasing number of successful new EC2 launches. We continue to recommend that customers launch new EC2 Instance launches that are not targeted to a specific Availability Zone (AZ) so that EC2 has flexibility in selecting the appropriate AZ. We also wanted to share that we are continuing to successfully process the backlog of events for both EventBridge and Cloudtrail. New events published to these services are being delivered normally and are not experiencing elevated delivery latencies. We will provide an update by 6:30 AM PDT or sooner if we have additional information to share.
Oct 20 5:10 AM PDT We confirm that we have now recovered processing of SQS queues via Lambda Event Source Mappings. We are now working through processing the backlog of SQS messages in Lambda queues.
Oct 20 4:48 AM PDT We continue to work to fully restore new EC2 launches in US-EAST-1. We recommend EC2 Instance launches that are not targeted to a specific Availability Zone (AZ) so that EC2 has flexibility in selecting the appropriate AZ. The impairment in new EC2 launches also affects services such as RDS, ECS, and Glue. We also recommend that Auto Scaling Groups are configured to use multiple AZs so that Auto Scaling can manage EC2 instance launches automatically. We are pursuing further mitigation steps to recover Lambda’s polling delays for Event Source Mappings for SQS. AWS features that depend on Lambda’s SQS polling capabilities such as Organization policy updates are also experiencing elevated processing times. We will provide an update by 5:30 AM PDT.
Oct 20 4:08 AM PDT We are continuing to work towards full recovery for EC2 launch errors, which may manifest as an Insufficient Capacity Error. Additionally, we continue to work toward mitigation for elevated polling delays for Lambda, specifically for Lambda Event Source Mappings for SQS. We will provide an update by 5:00 AM PDT.
Oct 20 3:35 AM PDT The underlying DNS issue has been fully mitigated, and most AWS Service operations are succeeding normally now. Some requests may be throttled while we work toward full resolution. Additionally, some services are continuing to work through a backlog of events such as Cloudtrail and Lambda. While most operations are recovered, requests to launch new EC2 instances (or services that launch EC2 instances such as ECS) in the US-EAST-1 Region are still experiencing increased error rates. We continue to work toward full resolution. If you are still experiencing an issue resolving the DynamoDB service endpoints in US-EAST-1, we recommend flushing your DNS caches. We will provide an update by 4:15 AM, or sooner if we have additional information to share.
Oct 20 3:03 AM PDT We continue to observe recovery across most of the affected AWS Services. We can confirm global services and features that rely on US-EAST-1 have also recovered. We continue to work towards full resolution and will provide updates as we have more information to share.
Oct 20 2:27 AM PDT We are seeing significant signs of recovery. Most requests should now be succeeding. We continue to work through a backlog of queued requests. We will continue to provide additional information.
Oct 20 2:22 AM PDT We have applied initial mitigations and we are observing early signs of recovery for some impacted AWS Services. During this time, requests may continue to fail as we work toward full resolution. We recommend customers retry failed requests. While requests begin succeeding, there may be additional latency and some services will have a backlog of work to work through, which may take additional time to fully process. We will continue to provide updates as we have more information to share, or by 3:15 AM.
Oct 20 2:01 AM PDT We have identified a potential root cause for error rates for the DynamoDB APIs in the US-EAST-1 Region. Based on our investigation, the issue appears to be related to DNS resolution of the DynamoDB API endpoint in US-EAST-1. We are working on multiple parallel paths to accelerate recovery. This issue also affects other AWS Services in the US-EAST-1 Region. Global services or features that rely on US-EAST-1 endpoints such as IAM updates and DynamoDB Global tables may also be experiencing issues. During this time, customers may be unable to create or update Support Cases. We recommend customers continue to retry any failed requests. We will continue to provide updates as we have more information to share, or by 2:45 AM.
Oct 20 1:26 AM PDT We can confirm significant error rates for requests made to the DynamoDB endpoint in the US-EAST-1 Region. This issue also affects other AWS Services in the US-EAST-1 Region as well. During this time, customers may be unable to create or update Support Cases. Engineers were immediately engaged and are actively working on both mitigating the issue, and fully understanding the root cause. We will continue to provide updates as we have more information to share, or by 2:00 AM.
Oct 20 12:51 AM PDT We can confirm increased error rates and latencies for multiple AWS Services in the US-EAST-1 Region. This issue may also be affecting Case Creation through the AWS Support Center or the Support API. We are actively engaged and working to both mitigate the issue and understand root cause. We will provide an update in 45 minutes, or sooner if we have additional information to share.
Oct 20 12:11 AM PDT We are investigating increased error rates and latencies for multiple AWS services in the US-EAST-1 Region. We will provide another update in the next 30-45 minutes.`,
    affectedServices: {
      impacted: [
        "AWS Application Migration Service", "AWS B2B Data Interchange", "AWS Batch", "AWS Billing Console", "AWS Client VPN",
        "AWS Cloud WAN", "AWS CloudHSM", "AWS CodeBuild", "AWS Config", "AWS DataSync", "AWS Database Migration Service",
        "AWS Deadline Cloud", "AWS Directory Service", "AWS Elastic Disaster Recovery", "AWS Elastic VMWare Service", "AWS Elemental",
        "AWS Global Accelerator", "AWS Glue", "AWS HealthImaging", "AWS HealthLake", "AWS HealthOmics", "AWS IoT Core", "AWS Lambda",
        "AWS Launch Wizard", "AWS Outposts", "AWS Parallel Computing Service", "AWS Partner Central", "AWS Payment Cryptography",
        "AWS Private Certificate Authority", "AWS Resource Groups", "AWS Secrets Manager", "AWS Security Incident Response",
        "AWS Security Token Service", "AWS Site-to-Site VPN", "AWS Step Functions", "AWS Storage Gateway",
        "AWS Systems Manager for SAP", "AWS Transfer Family", "AWS Transit Gateway", "AWS Verified Access", "AWS WickrGov",
        "Amazon AppStream 2.0", "Amazon Athena", "Amazon Aurora DSQL Service", "Amazon Bedrock", "Amazon Chime", "Amazon CloudFront",
        "Amazon CloudWatch", "Amazon CloudWatch Application Insights", "Amazon Cognito", "Amazon Connect", "Amazon DataZone",
        "Amazon DocumentDB", "Amazon EMR Serverless", "Amazon ElastiCache", "Amazon Elastic Compute Cloud", "Amazon Elastic Container Registry",
        "Amazon Elastic Container Service", "Amazon Elastic File System", "Amazon Elastic Kubernetes Service", "Amazon Elastic Load Balancing",
        "Amazon Elastic MapReduce", "Amazon EventBridge", "Amazon EventBridge Scheduler", "Amazon FSx", "Amazon GameLift Servers",
        "Amazon GameLift Streams", "Amazon GuardDuty", "Amazon Interactive Video Service", "Amazon Kendra", "Amazon Kinesis Data Streams",
        "Amazon Kinesis Firehose", "Amazon Kinesis Video Streams", "Amazon Location Service", "Amazon MQ",
        "Amazon Managed Service for Apache Flink", "Amazon Managed Service for Prometheus", "Amazon Managed Streaming for Apache Kafka",
        "Amazon Managed Workflows for Apache Airflow", "Amazon Neptune", "Amazon OpenSearch Service", "Amazon Pinpoint", "Amazon Polly",
        "Amazon Q Business", "Amazon Redshift", "Amazon Relational Database Service", "Amazon SageMaker", "Amazon Security Lake",
        "Amazon Simple Notification Service", "Amazon Simple Storage Service", "Amazon Simple Workflow Service", "Amazon Transcribe",
        "Amazon VPC IP Address Manager", "Amazon WorkSpaces", "Amazon WorkSpaces Thin Client", "EC2 Image Builder", "Traffic Mirroring"
      ],
      resolved: [
        "AWS AppSync", "AWS CloudFormation", "AWS CloudTrail", "AWS Elastic Beanstalk", "AWS End User Messaging",
        "AWS Firewall Manager", "AWS IAM Identity Center", "AWS Identity and Access Management", "AWS IoT Analytics",
        "AWS IoT Events", "AWS IoT FleetWise", "AWS IoT SiteWise", "AWS NAT Gateway", "AWS Network Firewall", "AWS Organizations",
        "AWS Support API", "AWS Support Center", "AWS Systems Manager", "AWS VPCE PrivateLink", "Amazon API Gateway", "Amazon AppFlow",
        "Amazon DynamoDB", "Amazon Simple Email Service", "Amazon Simple Queue Service", "Amazon VPC Lattice", "Amazon WorkMail"
      ]
    }
  },
];

export const SERVICE_HISTORY_EVENTS: ServiceEvent[] = [
  {
    id: 101,
    service: 'Amazon DynamoDB',
    description: 'Resolved: Increased Latency',
    region: 'us-west-2',
    startTime: 'December 15, 2023, 04:00 PM PST',
    lastUpdateTime: 'December 15, 2023, 05:15 PM PST',
    severity: 'Operational',
    rawLog: `December 15 04:05 PM PST [Informational] We began investigating increased latency for DynamoDB tables in the US-WEST-2 Region.
December 15 04:40 PM PST [Informational] We identified a configuration error in a downstream dependency and are working on a rollback.
December 15 05:15 PM PST [Resolved] The rollback is complete, and latency has returned to normal levels. The service is operating normally.`,
  },
  {
    id: 102,
    service: 'AWS Lambda',
    description: 'Resolved: Invocation Errors',
    region: 'eu-central-1',
    startTime: 'November 02, 2023, 06:00 AM PDT',
    lastUpdateTime: 'November 02, 2023, 07:30 AM PDT',
    severity: 'Operational',
    rawLog: `November 02 06:05 AM PDT [Informational] We are investigating an increase in invocation errors for Lambda functions in the EU-CENTRAL-1 Region.
November 02 06:45 AM PDT [Informational] The issue has been traced to a faulty deployment in our internal metrics-gathering fleet. We are rolling back the change.
November 02 07:30 AM PDT [Resolved] The deployment has been rolled back, and invocation error rates have returned to normal.`,
  },
  {
    id: 103,
    service: 'Amazon CloudFront',
    description: 'Resolved: Propagation Delays',
    region: 'Global',
    startTime: 'October 18, 2023, 01:00 PM PDT',
    lastUpdateTime: 'October 18, 2023, 03:00 PM PDT',
    severity: 'Operational',
    rawLog: `October 18 01:10 PM PDT [Informational] We are aware of an issue causing delays in the propagation of configuration changes (e.g., new distributions, invalidations) for CloudFront.
October 18 02:15 PM PDT [Informational] We have identified a backlog in our configuration distribution system and are taking steps to clear it.
October 18 03:00 PM PDT [Resolved] The backlog has been cleared, and configuration changes are now propagating normally.`,
  },
];