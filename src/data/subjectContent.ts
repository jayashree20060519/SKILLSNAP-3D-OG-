export interface SubjectContent {
  id: string;
  title: string;
  description: string;
  introduction: string;
  coreConcepts: {
    title: string;
    content: string;
  }[];
  architecture: {
    title: string;
    content: string;
  };
  components: {
    name: string;
    description: string;
  }[];
  howItWorks: {
    step: number;
    title: string;
    description: string;
  }[];
  realWorldExamples: string[];
  advantages: string[];
  limitations: string[];
  useCases: string[];
  interviewPoints: string[];
}

export const subjectContents: Record<string, SubjectContent> = {
  'cloud-computing': {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    description: 'Master the fundamentals of cloud infrastructure, services, and deployment models',
    introduction: `Cloud Computing has revolutionized how businesses and individuals access and manage computing resources. Instead of owning and maintaining physical servers, organizations can now rent computing power, storage, and applications from cloud service providers like Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).

Think of cloud computing like electricity - you don't need to own a power plant to use electricity; you simply plug into the grid and pay for what you use. Similarly, cloud computing provides on-demand access to computing resources over the internet, allowing you to scale up or down based on your needs without massive upfront investments.

The global cloud computing market is expected to reach $1.5 trillion by 2030, making it one of the most critical skills for modern software engineers, DevOps professionals, and IT architects. Companies like Netflix, Spotify, Airbnb, and even NASA rely heavily on cloud infrastructure to serve millions of users worldwide.`,
    coreConcepts: [
      {
        title: 'Service Models (IaaS, PaaS, SaaS)',
        content: `Cloud computing offers three primary service models, each providing different levels of control and management:

**Infrastructure as a Service (IaaS)**: Provides virtualized computing resources over the internet. You get virtual machines, storage, and networks, but you manage the operating system, middleware, and applications. Examples: AWS EC2, Google Compute Engine, Azure Virtual Machines. Use case: When you need full control over your infrastructure.

**Platform as a Service (PaaS)**: Provides a platform for developers to build, deploy, and manage applications without worrying about underlying infrastructure. The provider manages servers, storage, and networking. Examples: Heroku, Google App Engine, AWS Elastic Beanstalk. Use case: When you want to focus on coding, not infrastructure management.

**Software as a Service (SaaS)**: Delivers fully functional applications over the internet. Users access software through a web browser without installation or maintenance. Examples: Gmail, Salesforce, Microsoft 365, Slack. Use case: When you need ready-to-use applications without any technical management.`
      },
      {
        title: 'Deployment Models',
        content: `Cloud deployment models define where and how your cloud infrastructure is hosted:

**Public Cloud**: Resources are owned and operated by third-party providers and shared among multiple organizations. Most cost-effective and scalable. Examples: AWS, Azure, GCP. Best for: Startups, web applications, development environments.

**Private Cloud**: Dedicated infrastructure for a single organization, either on-premises or hosted by a third party. Offers more control and security. Best for: Banks, healthcare, government agencies with strict compliance requirements.

**Hybrid Cloud**: Combines public and private clouds, allowing data and applications to move between them. Provides flexibility and optimization. Best for: Enterprises that need to keep sensitive data private while leveraging public cloud for scalability.

**Multi-Cloud**: Uses services from multiple cloud providers to avoid vendor lock-in and optimize costs. Best for: Large enterprises with complex requirements.`
      },
      {
        title: 'Key Characteristics',
        content: `Cloud computing is defined by five essential characteristics that distinguish it from traditional computing:

**On-Demand Self-Service**: Users can provision resources automatically without human interaction with the service provider. You can spin up a server in minutes through a web console or API.

**Broad Network Access**: Services are available over the network and accessed through standard mechanisms (web browsers, mobile apps, APIs) from any device.

**Resource Pooling**: Provider's resources are pooled to serve multiple customers using a multi-tenant model. Resources are dynamically assigned based on demand.

**Rapid Elasticity**: Resources can be scaled up or down quickly to match demand. During Black Friday, an e-commerce site can automatically add more servers and scale back afterward.

**Measured Service**: Cloud systems automatically control and optimize resource usage. You pay only for what you use, similar to a utility bill.`
      }
    ],
    architecture: {
      title: 'Cloud Architecture',
      content: `A typical cloud architecture consists of multiple layers working together:

**Frontend Layer (Client Layer)**: This is what users interact with - web browsers, mobile apps, or desktop applications. Users send requests through this layer to access cloud services.

**Internet Layer**: The communication highway that connects users to cloud services. This includes CDNs (Content Delivery Networks) that cache content closer to users for faster access.

**Cloud Platform Layer**: The heart of cloud computing, consisting of:
- **Load Balancers**: Distribute incoming traffic across multiple servers to ensure no single server is overwhelmed
- **Application Servers**: Run your business logic and applications
- **API Gateway**: Manages and routes API requests
- **Authentication Services**: Handle user identity and access control

**Data Layer**: Where information is stored and managed:
- **Databases**: SQL (PostgreSQL, MySQL) or NoSQL (MongoDB, DynamoDB)
- **Object Storage**: For files, images, videos (AWS S3, Azure Blob Storage)
- **Cache**: In-memory data stores (Redis, Memcached) for fast data retrieval

**Backend Services**: Supporting infrastructure including monitoring, logging, backup, security, and disaster recovery systems.

All these layers communicate through secure APIs and are managed through orchestration tools that automate deployment, scaling, and management.`
    },
    components: [
      {
        name: 'Virtual Machines (VMs)',
        description: 'Emulated computer systems that run on physical servers. Each VM has its own operating system and can run applications independently. AWS EC2 and Azure VMs are examples.'
      },
      {
        name: 'Containers',
        description: 'Lightweight, portable packages that include application code and all dependencies. Docker containers and Kubernetes orchestration have become industry standards for cloud deployments.'
      },
      {
        name: 'Load Balancers',
        description: 'Distribute incoming network traffic across multiple servers to ensure high availability and reliability. They detect unhealthy servers and redirect traffic to healthy ones.'
      },
      {
        name: 'Storage Services',
        description: 'Provide scalable storage solutions: Block storage (like hard drives), Object storage (for files), and File storage (shared file systems). Examples: AWS S3, Azure Blob Storage.'
      },
      {
        name: 'Databases',
        description: 'Managed database services that handle backups, scaling, and maintenance automatically. Includes relational (RDS, Cloud SQL) and NoSQL (DynamoDB, Cosmos DB) options.'
      },
      {
        name: 'CDN (Content Delivery Network)',
        description: 'Distributed network of servers that deliver content to users from the nearest geographic location, reducing latency and improving load times. CloudFront and Cloudflare are examples.'
      },
      {
        name: 'API Gateway',
        description: 'Manages, monitors, and secures APIs. It handles request routing, authentication, rate limiting, and provides analytics on API usage.'
      },
      {
        name: 'Serverless Functions',
        description: 'Run code without managing servers. You write functions that execute in response to events. AWS Lambda, Azure Functions, and Google Cloud Functions are popular choices.'
      }
    ],
    howItWorks: [
      {
        step: 1,
        title: 'User Request',
        description: 'A user opens a web browser or mobile app and makes a request (e.g., loading a website, uploading a photo, or streaming a video). This request travels over the internet to the cloud provider\'s infrastructure.'
      },
      {
        step: 2,
        title: 'DNS Resolution',
        description: 'The Domain Name System (DNS) translates the human-readable domain name (like www.example.com) into an IP address that computers can understand. Cloud providers use global DNS services for fast resolution.'
      },
      {
        step: 3,
        title: 'Load Balancing',
        description: 'The request reaches a load balancer, which intelligently distributes it to one of many available servers based on factors like server health, current load, and geographic proximity. This ensures no single server is overwhelmed.'
      },
      {
        step: 4,
        title: 'Application Processing',
        description: 'The selected application server receives the request and processes it. This might involve running business logic, performing calculations, or preparing data. The server may call other microservices or APIs as needed.'
      },
      {
        step: 5,
        title: 'Database Query',
        description: 'If data is needed, the application server queries the database. Cloud databases are often distributed across multiple locations for redundancy and fast access. Caching layers (like Redis) may serve frequently accessed data instantly.'
      },
      {
        step: 6,
        title: 'Data Processing',
        description: 'The database retrieves the requested data and sends it back to the application server. The server processes this data, formats it appropriately (JSON, HTML, etc.), and prepares the response.'
      },
      {
        step: 7,
        title: 'Response Delivery',
        description: 'The processed response travels back through the load balancer and internet to the user\'s device. CDNs may cache static content (images, CSS, JavaScript) to speed up future requests.'
      },
      {
        step: 8,
        title: 'Monitoring & Logging',
        description: 'Throughout this entire process, cloud monitoring tools track performance metrics, log events, and alert administrators of any issues. This data helps optimize performance and troubleshoot problems.'
      }
    ],
    realWorldExamples: [
      'Netflix uses AWS to stream content to 230+ million subscribers worldwide, handling billions of requests daily',
      'Spotify runs on Google Cloud Platform to deliver music streaming to 500+ million users with minimal latency',
      'Airbnb leverages AWS to manage millions of property listings and bookings across 220+ countries',
      'Zoom scaled from 10 million to 300 million daily meeting participants during COVID-19 using cloud infrastructure',
      'NASA uses AWS to process satellite imagery and climate data, storing petabytes of information',
      'Dropbox migrated from AWS to its own infrastructure but still uses cloud for global content delivery',
      'Slack handles billions of messages daily using AWS, ensuring 99.99% uptime for team communication'
    ],
    advantages: [
      'Cost Efficiency: Pay only for resources you use, eliminating upfront hardware costs and reducing operational expenses',
      'Scalability: Instantly scale resources up or down based on demand, handling traffic spikes effortlessly',
      'Global Reach: Deploy applications in multiple regions worldwide, providing low latency to users everywhere',
      'Reliability: Built-in redundancy and backup systems ensure high availability (99.9%+ uptime)',
      'Automatic Updates: Cloud providers handle security patches, software updates, and infrastructure maintenance',
      'Disaster Recovery: Automated backups and geographic redundancy protect against data loss',
      'Innovation Speed: Launch new features faster without waiting for hardware procurement and setup',
      'Accessibility: Access your applications and data from anywhere with an internet connection',
      'Security: Enterprise-grade security with encryption, firewalls, and compliance certifications (SOC 2, HIPAA, GDPR)'
    ],
    limitations: [
      'Internet Dependency: Requires stable internet connection; offline access is limited',
      'Vendor Lock-in: Migrating between cloud providers can be complex and costly due to proprietary services',
      'Security Concerns: Data is stored on third-party servers, raising privacy and compliance questions',
      'Limited Control: Less control over underlying infrastructure compared to on-premises solutions',
      'Unpredictable Costs: Without proper monitoring, costs can escalate quickly with increased usage',
      'Compliance Challenges: Some industries have strict regulations about data location and handling',
      'Performance Variability: Shared resources can sometimes lead to "noisy neighbor" problems',
      'Learning Curve: Requires new skills and understanding of cloud-specific architectures and services'
    ],
    useCases: [
      'Web Application Hosting: Deploy scalable websites and web apps that handle variable traffic',
      'Big Data Analytics: Process massive datasets using distributed computing power',
      'Machine Learning: Train AI models using powerful GPUs without buying expensive hardware',
      'Disaster Recovery: Maintain backup systems in the cloud for business continuity',
      'Development & Testing: Create temporary environments for testing without infrastructure investment',
      'IoT Applications: Collect and process data from millions of connected devices',
      'Content Delivery: Stream video, audio, and deliver content globally with low latency',
      'Enterprise Applications: Run CRM, ERP, and collaboration tools as SaaS solutions',
      'Gaming: Host multiplayer game servers that scale with player demand',
      'Backup & Storage: Store and protect critical business data with automated backups'
    ],
    interviewPoints: [
      'Explain the difference between horizontal scaling (adding more servers) and vertical scaling (upgrading existing servers)',
      'Understand CAP theorem: Consistency, Availability, Partition tolerance - you can only guarantee two',
      'Know the shared responsibility model: Provider secures infrastructure, you secure your applications and data',
      'Explain how auto-scaling works: Monitors metrics (CPU, memory) and automatically adds/removes resources',
      'Understand regions and availability zones: Geographic locations with multiple isolated data centers',
      'Know common cloud design patterns: Microservices, serverless, event-driven architecture',
      'Explain the difference between stateful and stateless applications in cloud context',
      'Understand cloud cost optimization: Reserved instances, spot instances, right-sizing resources',
      'Know security best practices: IAM roles, encryption at rest and in transit, network segmentation',
      'Explain how CDNs improve performance: Edge caching, reduced latency, DDoS protection'
    ]
  },
  'advanced-networking': {
    id: 'advanced-networking',
    title: 'Advanced Networking',
    description: 'Deep dive into network protocols, architectures, and modern networking concepts',
    introduction: `Advanced Networking is the backbone of modern digital communication, enabling billions of devices to communicate seamlessly across the globe. From the moment you send a message on WhatsApp to streaming 4K video on Netflix, complex networking protocols and infrastructure work behind the scenes to make it happen.

Understanding networking is crucial for any tech professional. Whether you're a software engineer debugging API calls, a DevOps engineer configuring cloud infrastructure, or a cybersecurity specialist protecting systems, networking knowledge is fundamental. Companies like Cisco, Juniper, and cloud providers employ thousands of network engineers to design and maintain the infrastructure that powers the internet.

Modern networking has evolved far beyond simple data transmission. Today's networks must handle massive scale (billions of devices), ensure security (protecting against cyber threats), provide low latency (for real-time applications like gaming and video calls), and support emerging technologies like 5G, IoT, and edge computing. The global networking equipment market is valued at over $50 billion, reflecting its critical importance in our connected world.`,
    coreConcepts: [
      {
        title: 'OSI Model & TCP/IP Stack',
        content: `The OSI (Open Systems Interconnection) model is a conceptual framework that standardizes network communication into seven layers. Understanding this model is essential for troubleshooting and designing networks:

**Layer 7 - Application**: Where users interact with network services. Protocols: HTTP/HTTPS (web), SMTP (email), FTP (file transfer), DNS (domain names). Example: When you type a URL in your browser, the application layer handles the HTTP request.

**Layer 6 - Presentation**: Translates data between application and network formats. Handles encryption (SSL/TLS), compression, and data formatting. Example: Converting JPEG images to a format that can be transmitted over the network.

**Layer 5 - Session**: Manages connections between applications. Establishes, maintains, and terminates sessions. Example: Keeping your login session active while browsing a website.

**Layer 4 - Transport**: Ensures reliable data delivery. TCP (reliable, ordered) vs UDP (fast, connectionless). Handles port numbers and flow control. Example: TCP ensures all packets of a file download arrive correctly; UDP is used for live video streaming where speed matters more than perfection.

**Layer 3 - Network**: Routes data across networks using IP addresses. Routers operate at this layer. Handles logical addressing and path determination. Example: Your router deciding the best path for data to reach Google's servers.

**Layer 2 - Data Link**: Manages direct node-to-node data transfer. Uses MAC addresses. Switches operate here. Handles error detection and frame synchronization. Example: Your computer sending data to your router over WiFi.

**Layer 1 - Physical**: The actual hardware - cables, radio frequencies, voltage levels. Transmits raw bits over physical medium. Example: Ethernet cables, fiber optics, WiFi radio waves.

The TCP/IP model simplifies this to four layers (Application, Transport, Internet, Network Access) and is what the internet actually uses.`
      },
      {
        title: 'IP Addressing & Subnetting',
        content: `IP addresses are unique identifiers for devices on a network, like postal addresses for computers:

**IPv4**: 32-bit addresses written as four octets (e.g., 192.168.1.1). Provides about 4.3 billion addresses, which we've nearly exhausted. Structure: Network portion + Host portion. Classes: A (large networks), B (medium), C (small).

**IPv6**: 128-bit addresses (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334). Provides 340 undecillion addresses - enough for every grain of sand on Earth to have an IP address. Adoption is growing as IPv4 addresses run out.

**Subnetting**: Dividing a network into smaller sub-networks for better organization and security. Uses subnet masks (e.g., 255.255.255.0 or /24 in CIDR notation). Example: A company might use 192.168.1.0/24 for employees, 192.168.2.0/24 for guests, and 192.168.3.0/24 for IoT devices.

**Private vs Public IPs**: Private IPs (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are used within local networks. NAT (Network Address Translation) converts private IPs to public IPs for internet access. Your home router does this - all your devices share one public IP address.

**CIDR (Classless Inter-Domain Routing)**: Modern method for IP allocation. /24 means 24 bits for network, 8 bits for hosts (256 addresses). /16 gives 65,536 addresses. Understanding CIDR is crucial for cloud networking.`
      },
      {
        title: 'Routing Protocols',
        content: `Routing protocols determine the best path for data to travel across networks:

**Static Routing**: Manually configured routes. Simple but not scalable. Used in small networks or for specific critical paths. Example: Configuring your home router to always send certain traffic through a VPN.

**Dynamic Routing**: Routers automatically discover and update routes. Adapts to network changes. Types:

**RIP (Routing Information Protocol)**: Simple distance-vector protocol. Uses hop count as metric (max 15 hops). Slow convergence. Rarely used in modern networks but good for learning basics.

**OSPF (Open Shortest Path First)**: Link-state protocol. Fast convergence, scalable. Uses Dijkstra's algorithm to find shortest path. Widely used in enterprise networks. Supports VLSM and route summarization.

**BGP (Border Gateway Protocol)**: The protocol that runs the internet. Path-vector protocol used between autonomous systems (ISPs, large organizations). Makes routing decisions based on policies, not just shortest path. Example: When you access a website, BGP determines which ISP routes your traffic takes.

**EIGRP (Enhanced Interior Gateway Routing Protocol)**: Cisco proprietary (now open). Hybrid protocol combining best of distance-vector and link-state. Fast convergence, low bandwidth usage.

Understanding routing is crucial for network engineers, cloud architects, and anyone working with distributed systems.`
      }
    ],
    architecture: {
      title: 'Network Architecture',
      content: `Modern network architecture follows a hierarchical design for scalability, reliability, and manageability:

**Three-Tier Architecture**:

**Core Layer**: The backbone of the network. High-speed switching and routing between different parts of the network. No packet manipulation or filtering - pure speed. Uses redundant links for reliability. Equipment: High-end routers and switches capable of handling massive throughput.

**Distribution Layer**: Acts as the boundary between access and core layers. Implements policies, routing, and filtering. Handles VLAN routing, access control lists (ACLs), and quality of service (QoS). Aggregates traffic from access layer before sending to core.

**Access Layer**: Where end devices (computers, phones, IoT devices) connect to the network. Provides port security, VLANs, and PoE (Power over Ethernet). Switches at this layer are typically less expensive but numerous.

**Modern Variations**:

**Spine-Leaf Architecture**: Used in data centers. Every leaf switch connects to every spine switch, providing multiple equal-cost paths. Benefits: Predictable latency, easy scaling, high bandwidth. Used by cloud providers and large enterprises.

**Software-Defined Networking (SDN)**: Separates control plane (decision-making) from data plane (packet forwarding). Centralized controller manages the entire network programmatically. Benefits: Automation, flexibility, easier management. Examples: OpenFlow, Cisco ACI, VMware NSX.

**Network Function Virtualization (NFV)**: Replaces dedicated hardware (firewalls, load balancers) with software running on standard servers. Enables rapid deployment and scaling of network services.

**Zero Trust Architecture**: Modern security model that assumes no implicit trust. Every access request is verified, regardless of source. Implements micro-segmentation and continuous authentication.`
    },
    components: [
      {
        name: 'Routers',
        description: 'Intelligent devices that forward data packets between networks using IP addresses. They make decisions about the best path for data based on routing tables and protocols. Enterprise routers handle millions of packets per second.'
      },
      {
        name: 'Switches',
        description: 'Connect devices within a network using MAC addresses. Layer 2 switches operate at data link layer; Layer 3 switches can also route. Modern switches support VLANs, QoS, and port security.'
      },
      {
        name: 'Firewalls',
        description: 'Security devices that monitor and control network traffic based on rules. Can be hardware appliances or software. Next-gen firewalls include deep packet inspection, intrusion prevention, and application awareness.'
      },
      {
        name: 'Load Balancers',
        description: 'Distribute network traffic across multiple servers to ensure no single server is overwhelmed. Support health checks, SSL termination, and session persistence. Critical for high-availability applications.'
      },
      {
        name: 'DNS Servers',
        description: 'Translate human-readable domain names (www.google.com) into IP addresses. Hierarchical system with root servers, TLD servers, and authoritative servers. Caching improves performance.'
      },
      {
        name: 'VPN Gateways',
        description: 'Create secure encrypted tunnels over public networks. Enable remote workers to access corporate resources securely. Types: Site-to-site VPN (connecting offices) and remote access VPN (individual users).'
      },
      {
        name: 'Network Monitoring Tools',
        description: 'Track network performance, detect issues, and provide analytics. Examples: Wireshark (packet analysis), Nagios (monitoring), SolarWinds (comprehensive management). Essential for maintaining network health.'
      },
      {
        name: 'Access Points',
        description: 'Provide wireless connectivity to devices. Modern APs support WiFi 6/6E, multiple SSIDs, and seamless roaming. Enterprise APs are centrally managed and support advanced features like band steering.'
      }
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Device Connection',
        description: 'A device (laptop, phone, IoT sensor) connects to the network, either via Ethernet cable or WiFi. It obtains an IP address through DHCP (Dynamic Host Configuration Protocol), which automatically assigns network configuration.'
      },
      {
        step: 2,
        title: 'ARP Resolution',
        description: 'When the device wants to communicate, it uses ARP (Address Resolution Protocol) to find the MAC address of the destination or gateway. ARP broadcasts "Who has IP 192.168.1.1?" and the router responds with its MAC address.'
      },
      {
        step: 3,
        title: 'Packet Creation',
        description: 'The application creates data and passes it down the network stack. Each layer adds its header: TCP/UDP port numbers, IP addresses, MAC addresses. This encapsulation process creates the final packet ready for transmission.'
      },
      {
        step: 4,
        title: 'Switch Forwarding',
        description: 'The packet reaches a switch, which examines the destination MAC address and forwards it to the appropriate port. Switches maintain a MAC address table learned from previous traffic. If destination is unknown, the switch floods all ports.'
      },
      {
        step: 5,
        title: 'Routing Decision',
        description: 'When the packet needs to leave the local network, it reaches a router. The router examines the destination IP address, consults its routing table, and determines the next hop. Routing protocols keep this table updated.'
      },
      {
        step: 6,
        title: 'Firewall Inspection',
        description: 'Before leaving the network, the packet passes through a firewall. The firewall checks against security rules: Is this traffic allowed? Is it from a trusted source? Does it match any threat signatures? Malicious packets are dropped.'
      },
      {
        step: 7,
        title: 'NAT Translation',
        description: 'For internet-bound traffic, NAT (Network Address Translation) converts the private IP address to a public IP address. The router maintains a translation table to route responses back to the correct internal device.'
      },
      {
        step: 8,
        title: 'Internet Transit',
        description: 'The packet travels through multiple ISP networks, guided by BGP routing. Each router along the path makes independent forwarding decisions. The packet may traverse dozens of routers across continents in milliseconds.'
      },
      {
        step: 9,
        title: 'Destination Arrival',
        description: 'The packet reaches the destination network, where the reverse process occurs: firewall inspection, routing, switching, and finally delivery to the target device. The receiving device sends an acknowledgment back through the same process.'
      },
      {
        step: 10,
        title: 'Connection Maintenance',
        description: 'For TCP connections, the session is maintained with keep-alive packets. Network monitoring tools track performance metrics: latency, packet loss, bandwidth usage. This data helps identify and resolve issues proactively.'
      }
    ],
    realWorldExamples: [
      'Google\'s global network spans 100+ points of presence and 27 subsea cables, delivering search results in milliseconds',
      'Netflix uses its own CDN (Open Connect) with 17,000+ servers in ISP networks to stream content efficiently',
      'Cloudflare\'s network handles 46+ million HTTP requests per second, protecting websites from DDoS attacks',
      'AWS operates 30+ regions with 96 availability zones, interconnected by a private global network',
      'Cisco\'s enterprise networks power 90% of Fortune 500 companies, handling billions of transactions daily',
      'Starlink uses satellite networking to provide internet to remote areas, with 4,000+ satellites in orbit',
      'Financial institutions use ultra-low-latency networks for high-frequency trading, where microseconds matter'
    ],
    advantages: [
      'Global Connectivity: Enables communication between billions of devices worldwide instantly',
      'Scalability: Modern networks can grow from dozens to millions of devices without redesign',
      'Reliability: Redundant paths and failover mechanisms ensure continuous operation (99.99%+ uptime)',
      'Security: Firewalls, encryption, and segmentation protect against cyber threats',
      'Performance: QoS ensures critical applications get priority bandwidth',
      'Flexibility: SDN and virtualization enable rapid network changes without physical reconfiguration',
      'Cost Efficiency: Shared infrastructure reduces per-device networking costs',
      'Monitoring: Real-time visibility into network health and performance',
      'Automation: Modern networks self-configure, self-heal, and self-optimize'
    ],
    limitations: [
      'Complexity: Large networks require specialized knowledge and careful planning',
      'Security Vulnerabilities: Networks are constant targets for cyberattacks and require ongoing protection',
      'Latency: Physical distance and routing hops introduce delays (speed of light limitation)',
      'Bandwidth Constraints: Network congestion can slow down traffic during peak usage',
      'Single Points of Failure: Without proper redundancy, critical component failures can cause outages',
      'Configuration Errors: Misconfigurations can cause widespread network issues',
      'Cost: Enterprise-grade networking equipment and expertise are expensive',
      'Compatibility: Different vendors and protocols may not work together seamlessly'
    ],
    useCases: [
      'Enterprise Networks: Connect employees, offices, and data centers for business operations',
      'Data Center Networking: High-speed interconnects for cloud services and applications',
      'Campus Networks: Universities and large campuses with thousands of users and devices',
      'ISP Networks: Internet service providers routing traffic between customers and the internet',
      'IoT Networks: Connecting millions of sensors and smart devices in smart cities and industries',
      'Content Delivery: CDNs distributing content globally for fast access',
      'Financial Networks: Ultra-low-latency networks for trading and financial transactions',
      'Telecommunications: Mobile networks (4G/5G) connecting billions of phones',
      'Industrial Networks: Factory automation and SCADA systems for manufacturing',
      'Healthcare Networks: Connecting medical devices, patient records, and telemedicine systems'
    ],
    interviewPoints: [
      'Explain the difference between TCP and UDP: TCP is connection-oriented and reliable; UDP is connectionless and faster',
      'Understand the three-way handshake: SYN, SYN-ACK, ACK - how TCP establishes connections',
      'Know common port numbers: HTTP (80), HTTPS (443), SSH (22), FTP (21), DNS (53)',
      'Explain how DNS works: Recursive query from client to resolver to root to TLD to authoritative server',
      'Understand VLANs: Virtual LANs that segment networks logically without physical separation',
      'Know the difference between hub, switch, and router: Hub broadcasts, switch uses MAC, router uses IP',
      'Explain NAT types: Static (one-to-one), Dynamic (pool), PAT/Overload (many-to-one with ports)',
      'Understand QoS: Prioritizing network traffic based on application requirements',
      'Know how load balancing works: Round-robin, least connections, IP hash algorithms',
      'Explain the difference between Layer 2 and Layer 3 switches: L2 uses MAC, L3 can route with IP'
    ]
  },
  'iot': {
    id: 'iot',
    title: 'Internet of Things (IoT)',
    description: 'Explore the connected world of smart devices, sensors, and intelligent systems',
    introduction: `The Internet of Things (IoT) is transforming our world by connecting everyday objects to the internet, enabling them to collect, exchange, and act on data. From smart homes that adjust temperature automatically to industrial sensors that predict equipment failures, IoT is creating a more efficient, responsive, and intelligent world.

Imagine waking up to your smart alarm that adjusted based on your sleep patterns, your coffee maker starting automatically, your car warming up before you leave, and your office knowing you're arriving to adjust the lighting and temperature. This isn't science fiction - it's IoT in action today. By 2030, experts predict there will be over 25 billion connected IoT devices worldwide, generating trillions of dollars in economic value.

IoT is revolutionizing industries: Smart cities reduce energy consumption and traffic congestion, precision agriculture increases crop yields while using less water, healthcare devices monitor patients remotely, and factories use predictive maintenance to prevent costly downtime. Companies like Amazon (Alexa), Google (Nest), Tesla (connected cars), and John Deere (smart farming equipment) are leading the IoT revolution. Understanding IoT is essential for engineers, product managers, and anyone building the future of technology.`,
    coreConcepts: [
      {
        title: 'IoT Architecture Layers',
        content: `IoT systems follow a layered architecture, each layer serving a specific purpose:

**Perception Layer (Device Layer)**: The physical layer consisting of sensors and actuators that interact with the real world. Sensors collect data (temperature, motion, light, pressure, humidity, GPS location), while actuators perform actions (turning on lights, opening valves, adjusting motors). Examples: Temperature sensors in smart thermostats, motion detectors in security systems, accelerometers in fitness trackers.

**Network Layer (Connectivity Layer)**: Handles communication between devices and the cloud. Uses various protocols depending on requirements: WiFi (high bandwidth, short range), Bluetooth/BLE (low power, short range), Zigbee (mesh networking, low power), LoRaWAN (long range, low power), Cellular (4G/5G, wide coverage), NB-IoT (narrow-band for simple devices). Choosing the right protocol depends on power consumption, range, bandwidth, and cost requirements.

**Processing Layer (Edge/Fog Computing)**: Performs initial data processing close to the source. Instead of sending all raw data to the cloud, edge devices filter, aggregate, and analyze data locally. Benefits: Reduced latency (critical for real-time applications), lower bandwidth costs, improved privacy (sensitive data stays local), continued operation during network outages. Example: A smart camera detecting motion locally before sending alerts.

**Application Layer (Cloud Platform)**: The brain of the IoT system. Cloud platforms store, process, and analyze massive amounts of data from millions of devices. Provides: Data storage and management, analytics and machine learning, device management and updates, APIs for third-party integration, dashboards and visualization. Examples: AWS IoT Core, Azure IoT Hub, Google Cloud IoT.

**Business Layer**: Where IoT data creates value. Includes user interfaces (mobile apps, web dashboards), business intelligence tools, and integration with enterprise systems (ERP, CRM). This layer translates technical data into actionable business insights.`
      },
      {
        title: 'Communication Protocols',
        content: `IoT devices use specialized protocols optimized for constrained environments:

**MQTT (Message Queuing Telemetry Transport)**: Lightweight publish-subscribe protocol designed for unreliable networks and low-power devices. Uses topics for message routing. Example: A temperature sensor publishes to "home/bedroom/temperature" topic, and multiple subscribers (thermostat, mobile app, logging service) receive updates. Widely used in IoT due to small code footprint and minimal bandwidth usage.

**CoAP (Constrained Application Protocol)**: RESTful protocol designed for resource-constrained devices. Similar to HTTP but much lighter. Uses UDP instead of TCP for lower overhead. Supports discovery, multicast, and asynchronous communication. Example: A smart light bulb responding to GET/POST requests to change state.

**HTTP/HTTPS**: Traditional web protocols, used when devices have sufficient power and bandwidth. Familiar to developers and widely supported. Example: Smart home hubs communicating with cloud services.

**WebSocket**: Enables full-duplex communication over a single TCP connection. Useful for real-time bidirectional communication. Example: Live dashboard showing sensor data updates.

**Bluetooth Low Energy (BLE)**: Short-range wireless protocol optimized for low power consumption. Devices can run for months or years on a coin cell battery. Example: Fitness trackers, smart watches, beacon technology.

**Zigbee & Z-Wave**: Mesh networking protocols for home automation. Devices relay messages to extend range. Self-healing networks that route around failed nodes. Example: Smart home lighting systems where each bulb extends the network.

**LoRaWAN**: Long-range, low-power protocol for IoT. Can transmit data several kilometers with minimal power. Used for: Agricultural sensors, smart city infrastructure, asset tracking. Trade-off: Very low data rates (suitable only for small, infrequent messages).`
      },
      {
        title: 'Data Processing & Analytics',
        content: `IoT generates massive amounts of data that must be processed intelligently:

**Edge Computing**: Processing data at or near the source (on the device or local gateway). Advantages: Real-time response (no cloud round-trip), reduced bandwidth costs, improved privacy and security, resilience to network outages. Use cases: Autonomous vehicles (split-second decisions), industrial automation (immediate safety responses), smart cameras (local face detection). Example: A smart factory sensor detecting anomalies and stopping machinery immediately without waiting for cloud confirmation.

**Fog Computing**: Intermediate layer between edge and cloud. Processes data at the network edge (local servers, gateways) before sending to cloud. Provides: Aggregation of data from multiple devices, local analytics and filtering, temporary storage during network outages. Example: A smart building gateway aggregating data from hundreds of sensors before sending summaries to the cloud.

**Cloud Computing**: Centralized processing for complex analytics, machine learning, and long-term storage. Capabilities: Historical data analysis, predictive modeling, cross-device correlation, software updates and management. Example: Analyzing months of sensor data to predict equipment failures.

**Stream Processing**: Real-time analysis of data as it arrives. Technologies: Apache Kafka, Apache Flink, AWS Kinesis. Use case: Detecting anomalies in real-time from thousands of sensors. Example: Smart grid detecting power quality issues instantly.

**Machine Learning & AI**: IoT data trains ML models for: Predictive maintenance (predicting failures before they occur), anomaly detection (identifying unusual patterns), optimization (improving efficiency), personalization (adapting to user behavior). Example: Smart thermostats learning your schedule and preferences to optimize comfort and energy usage.

**Data Visualization**: Dashboards and reports that make IoT data actionable. Real-time monitoring, historical trends, alerts and notifications, KPI tracking. Tools: Grafana, Kibana, custom web dashboards.`
      }
    ],
    architecture: {
      title: 'IoT System Architecture',
      content: `A complete IoT system integrates multiple components working together:

**Device Layer**: Physical IoT devices with embedded sensors, microcontrollers, and communication modules. Modern IoT devices use: Low-power microcontrollers (ARM Cortex-M, ESP32), multiple sensors (temperature, humidity, motion, light), wireless communication (WiFi, BLE, LoRa), local storage for buffering data, battery or energy harvesting for power. Security features: Secure boot, encrypted storage, hardware security modules.

**Gateway Layer**: Intermediary devices that aggregate data from multiple sensors and provide connectivity to the cloud. Functions: Protocol translation (converting Zigbee to WiFi), data aggregation and filtering, local processing and caching, security (firewall, encryption), device management. Example: A smart home hub connecting dozens of Zigbee devices to the internet.

**Network Infrastructure**: The communication backbone connecting devices to the cloud. Includes: Local networks (WiFi, Ethernet), wide-area networks (cellular, LoRaWAN), internet connectivity, VPNs for secure communication. Considerations: Bandwidth requirements, latency sensitivity, reliability needs, coverage area, cost per device.

**Cloud Platform**: Scalable infrastructure for managing and processing IoT data. Components:
- **Device Management**: Registration, authentication, provisioning, firmware updates, monitoring
- **Data Ingestion**: Receiving and validating data from millions of devices
- **Storage**: Time-series databases for sensor data, object storage for files
- **Processing**: Real-time stream processing, batch analytics, machine learning
- **APIs**: RESTful APIs for application integration
- **Security**: Identity management, encryption, access control

**Application Layer**: User-facing applications and business logic. Includes: Mobile apps for end users, web dashboards for monitoring, integration with enterprise systems, third-party integrations (IFTTT, Alexa, Google Home), notification systems (email, SMS, push notifications).

**Security Throughout**: IoT security is critical and must be implemented at every layer: Device security (secure boot, encrypted communication), network security (VPNs, firewalls), cloud security (authentication, authorization, encryption at rest), application security (secure APIs, input validation).`
    },
    components: [
      {
        name: 'Sensors',
        description: 'Devices that measure physical properties and convert them to electrical signals. Types: Temperature (thermistors, thermocouples), Motion (PIR, accelerometers), Light (photodiodes, LDR), Pressure (barometric, piezoelectric), Humidity, Gas sensors, GPS, Cameras. Modern sensors are increasingly intelligent with built-in processing.'
      },
      {
        name: 'Actuators',
        description: 'Devices that perform physical actions based on commands. Examples: Motors (servo, stepper, DC), Relays (switching power), Solenoids (valves, locks), LEDs (indicators, displays), Speakers (audio output), Heating/cooling elements. Enable IoT systems to interact with and control the physical world.'
      },
      {
        name: 'Microcontrollers',
        description: 'Small computers that control IoT devices. Popular platforms: Arduino (beginner-friendly), ESP32 (WiFi/BLE built-in), Raspberry Pi (full Linux), STM32 (industrial-grade). Include: CPU, memory, GPIO pins, communication interfaces (I2C, SPI, UART), analog-to-digital converters.'
      },
      {
        name: 'Communication Modules',
        description: 'Enable wireless connectivity. Types: WiFi modules (ESP8266, ESP32), Cellular modems (4G/5G), Bluetooth modules (BLE), LoRa transceivers, Zigbee/Z-Wave radios, NFC chips. Choice depends on range, power consumption, bandwidth, and cost requirements.'
      },
      {
        name: 'Gateways',
        description: 'Bridge between IoT devices and the cloud. Functions: Protocol conversion, data aggregation, edge processing, security, local storage. Examples: Smart home hubs (Samsung SmartThings, Amazon Echo), industrial IoT gateways, cellular routers. Often run Linux and support multiple protocols.'
      },
      {
        name: 'Cloud Platforms',
        description: 'Managed services for IoT applications. AWS IoT Core (device management, rules engine), Azure IoT Hub (enterprise integration), Google Cloud IoT (ML integration), ThingSpeak (open-source), Particle Cloud (developer-friendly). Provide: Device provisioning, data storage, analytics, APIs, security.'
      },
      {
        name: 'Power Systems',
        description: 'Critical for IoT devices, especially remote sensors. Options: Batteries (lithium, alkaline), Solar panels with battery backup, Energy harvesting (vibration, thermal, RF), Power over Ethernet (PoE), Wired power. Design considerations: Power consumption optimization, sleep modes, efficient communication.'
      },
      {
        name: 'Edge Computing Devices',
        description: 'Powerful local processors for AI and analytics. Examples: NVIDIA Jetson (GPU for AI), Google Coral (TPU for ML), Intel NUC (compact PC), Raspberry Pi 4 (affordable edge device). Enable: Real-time video analytics, local machine learning inference, complex data processing without cloud latency.'
      }
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Sensor Data Collection',
        description: 'IoT sensors continuously or periodically measure physical phenomena (temperature, motion, light, etc.). The sensor converts the physical measurement into an electrical signal, which is then digitized by an analog-to-digital converter (ADC). The microcontroller reads this digital value and may perform initial processing or filtering.'
      },
      {
        step: 2,
        title: 'Local Processing',
        description: 'The device\'s microcontroller processes the raw sensor data. This may include: Filtering noise, averaging multiple readings, detecting threshold crossings, compressing data, encrypting sensitive information. Smart devices make local decisions: A smart thermostat might decide to turn on heating without consulting the cloud.'
      },
      {
        step: 3,
        title: 'Data Transmission',
        description: 'Processed data is packaged and transmitted using the appropriate protocol (MQTT, CoAP, HTTP). The device connects to the network (WiFi, cellular, LoRa) and sends data to a gateway or directly to the cloud. To conserve power, devices may batch data and transmit periodically rather than continuously.'
      },
      {
        step: 4,
        title: 'Gateway Aggregation',
        description: 'If using a gateway, it receives data from multiple devices, potentially using different protocols. The gateway: Translates protocols (Zigbee to WiFi), aggregates data from multiple sensors, performs edge analytics, buffers data during network outages, forwards processed data to the cloud.'
      },
      {
        step: 5,
        title: 'Cloud Ingestion',
        description: 'The cloud IoT platform receives data from thousands or millions of devices. An ingestion service (like AWS IoT Core or Azure IoT Hub) validates the data, authenticates the device, and routes messages to appropriate services. Data is typically published to message queues or streams for processing.'
      },
      {
        step: 6,
        title: 'Data Storage',
        description: 'Incoming data is stored in appropriate databases: Time-series databases (InfluxDB, TimescaleDB) for sensor readings, Document databases (MongoDB) for device metadata, Data lakes (S3, Azure Blob) for raw data archives, Relational databases for structured data. Storage strategies balance query performance, cost, and retention requirements.'
      },
      {
        step: 7,
        title: 'Analytics & Processing',
        description: 'Cloud services analyze the data: Real-time stream processing detects anomalies and triggers alerts, Batch processing generates reports and trends, Machine learning models predict failures or optimize operations, Business intelligence tools create dashboards and visualizations. Example: Analyzing temperature trends to predict HVAC maintenance needs.'
      },
      {
        step: 8,
        title: 'Action & Control',
        description: 'Based on analysis, the system takes action: Sending commands back to devices (turn on lights, adjust temperature), Triggering notifications (email, SMS, push notifications), Updating dashboards and mobile apps, Integrating with other systems (IFTTT, Zapier), Logging events for compliance and auditing.'
      },
      {
        step: 9,
        title: 'Device Management',
        description: 'The cloud platform manages the device fleet: Monitoring device health and connectivity, Pushing firmware updates over-the-air (OTA), Provisioning new devices, Revoking compromised devices, Tracking device lifecycle. This ensures the IoT system remains secure and up-to-date.'
      },
      {
        step: 10,
        title: 'User Interaction',
        description: 'End users interact with the IoT system through: Mobile apps showing real-time data and controls, Web dashboards for monitoring and management, Voice assistants (Alexa, Google Home), Automated rules and schedules, Integration with other smart devices. The system provides feedback and allows users to control their environment.'
      }
    ],
    realWorldExamples: [
      'Smart Homes: Nest thermostats save 10-12% on heating and 15% on cooling by learning user preferences and schedules',
      'Industrial IoT: GE\'s Predix platform monitors jet engines, wind turbines, and power plants, predicting failures before they occur',
      'Smart Cities: Barcelona uses IoT sensors for smart parking, lighting, and waste management, saving €42.5 million annually',
      'Agriculture: John Deere\'s smart tractors use IoT sensors and GPS for precision farming, increasing yields by 15-20%',
      'Healthcare: Continuous glucose monitors (CGM) track blood sugar 24/7, improving diabetes management',
      'Logistics: Amazon uses IoT sensors and robots in warehouses to track inventory and optimize fulfillment',
      'Automotive: Tesla vehicles collect data from millions of miles driven to improve autonomous driving algorithms',
      'Retail: Amazon Go stores use IoT sensors and computer vision for checkout-free shopping experiences'
    ],
    advantages: [
      'Automation: Reduces manual tasks and human error, increasing efficiency and consistency',
      'Real-time Monitoring: Instant visibility into operations, enabling quick response to issues',
      'Predictive Maintenance: Detect equipment problems before failures occur, reducing downtime and costs',
      'Data-Driven Decisions: Collect and analyze data to optimize processes and improve outcomes',
      'Cost Savings: Reduce energy consumption, labor costs, and waste through optimization',
      'Improved Safety: Monitor hazardous conditions and automatically trigger safety measures',
      'Enhanced User Experience: Personalized, responsive environments that adapt to user needs',
      'Scalability: Easily add more devices to expand system capabilities',
      'Remote Management: Control and monitor systems from anywhere in the world',
      'Environmental Benefits: Optimize resource usage, reduce waste, and lower carbon footprint'
    ],
    limitations: [
      'Security Risks: IoT devices are frequent targets for hackers; weak security can compromise entire networks',
      'Privacy Concerns: Constant data collection raises questions about surveillance and data ownership',
      'Interoperability: Different manufacturers use incompatible protocols and standards',
      'Complexity: Designing, deploying, and maintaining IoT systems requires specialized expertise',
      'Power Constraints: Battery-powered devices need frequent replacement or recharging',
      'Network Dependency: IoT systems rely on reliable connectivity; outages can cause failures',
      'Data Overload: Managing and analyzing massive amounts of data can be overwhelming',
      'Cost: Initial investment in devices, infrastructure, and platforms can be significant',
      'Maintenance: Updating and managing thousands of devices is challenging',
      'Reliability: Device failures, software bugs, and network issues can disrupt operations'
    ],
    useCases: [
      'Smart Homes: Automated lighting, climate control, security systems, and appliances',
      'Industrial IoT (IIoT): Factory automation, predictive maintenance, supply chain optimization',
      'Smart Cities: Traffic management, public safety, environmental monitoring, smart utilities',
      'Healthcare: Remote patient monitoring, medication adherence, hospital asset tracking',
      'Agriculture: Precision farming, livestock monitoring, irrigation control, crop health tracking',
      'Retail: Inventory management, customer analytics, smart shelves, personalized marketing',
      'Transportation: Fleet management, autonomous vehicles, smart parking, traffic optimization',
      'Energy: Smart grids, renewable energy optimization, consumption monitoring',
      'Environmental Monitoring: Air quality, water quality, weather stations, wildlife tracking',
      'Wearables: Fitness tracking, health monitoring, smartwatches, AR/VR devices'
    ],
    interviewPoints: [
      'Explain the difference between IoT and M2M: IoT is broader, includes cloud and analytics; M2M is direct device-to-device communication',
      'Understand edge vs cloud computing trade-offs: Edge provides low latency and privacy; cloud offers powerful analytics and storage',
      'Know common IoT protocols: MQTT (pub-sub, lightweight), CoAP (RESTful for constrained devices), HTTP (familiar but heavier)',
      'Explain IoT security challenges: Weak device security, lack of updates, insecure communication, privacy concerns',
      'Understand power optimization techniques: Sleep modes, efficient protocols, event-driven communication, energy harvesting',
      'Know the difference between WiFi, Bluetooth, and LoRa: WiFi (high bandwidth, high power), BLE (low power, short range), LoRa (long range, low bandwidth)',
      'Explain how MQTT works: Publish-subscribe model with broker, topics, QoS levels (0, 1, 2)',
      'Understand IoT data pipeline: Device → Gateway → Cloud → Storage → Analytics → Action',
      'Know common IoT platforms: AWS IoT Core, Azure IoT Hub, Google Cloud IoT, ThingSpeak',
      'Explain device provisioning: Process of registering, authenticating, and configuring new IoT devices securely'
    ]
  }
};
