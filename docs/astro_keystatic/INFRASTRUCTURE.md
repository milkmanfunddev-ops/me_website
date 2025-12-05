# Infrastructure Comparison

## Detailed Technical Analysis

---

## Current Infrastructure: WordPress on AWS

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              AWS Cloud                                   │
│                              us-east-1                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    VPC: vpc-09af0cb7a258184df                   │   │
│  │                         10.0.0.0/16                              │   │
│  ├─────────────────────────────────────────────────────────────────┤   │
│  │                                                                 │   │
│  │  ┌───────────────────────┐    ┌───────────────────────┐        │   │
│  │  │   Public Subnet 1     │    │   Public Subnet 2     │        │   │
│  │  │   10.0.1.0/24         │    │   10.0.2.0/24         │        │   │
│  │  │   us-east-1a          │    │   us-east-1b          │        │   │
│  │  │                       │    │                       │        │   │
│  │  │  ┌─────────────────┐  │    │                       │        │   │
│  │  │  │   EC2 Instance  │  │    │                       │        │   │
│  │  │  │   t2.micro      │  │    │                       │        │   │
│  │  │  │   WordPress     │  │    │                       │        │   │
│  │  │  │   Apache/PHP    │  │    │                       │        │   │
│  │  │  └────────┬────────┘  │    │                       │        │   │
│  │  └───────────│───────────┘    └───────────────────────┘        │   │
│  │              │                                                  │   │
│  │  ┌───────────────────────┐    ┌───────────────────────┐        │   │
│  │  │   Private Subnet 1    │    │   Private Subnet 2    │        │   │
│  │  │   10.0.3.0/24         │    │   10.0.4.0/24         │        │   │
│  │  │   us-east-1a          │    │   us-east-1b          │        │   │
│  │  │                       │    │                       │        │   │
│  │  │  ┌─────────────────┐  │    │                       │        │   │
│  │  │  │  RDS MySQL 8.0  │──│────│── (Multi-AZ Ready)    │        │   │
│  │  │  │  db.t3.micro    │  │    │                       │        │   │
│  │  │  │  20GB Storage   │  │    │                       │        │   │
│  │  │  └─────────────────┘  │    │                       │        │   │
│  │  └───────────────────────┘    └───────────────────────┘        │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────┐    ┌─────────────────┐                            │
│  │ Internet Gateway│    │   Elastic IP    │                            │
│  │ igw-0f97f38...  │    │  54.85.194.30   │                            │
│  └─────────────────┘    └─────────────────┘                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

External Access:
┌─────────────────┐
│     Users       │──── http://54.85.194.30 ────▶ EC2 ──▶ RDS
│   (Internet)    │
└─────────────────┘
```

### Resource Inventory

| Resource | Specification | Physical ID |
|----------|---------------|-------------|
| VPC | 10.0.0.0/16 | vpc-09af0cb7a258184df |
| Internet Gateway | - | igw-0f97f38cd834723ae |
| Public Subnet 1 | 10.0.1.0/24, us-east-1a | subnet-0db12d96a5b48a70c |
| Public Subnet 2 | 10.0.2.0/24, us-east-1b | subnet-0486dce33094eecad |
| Private Subnet 1 | 10.0.3.0/24, us-east-1a | subnet-09dca2abb83e5b4ac |
| Private Subnet 2 | 10.0.4.0/24, us-east-1b | subnet-0a983fb3a3b7a5b1e |
| Route Table | Public routes | rtb-0eb629dac25f0e255 |
| EC2 Instance | t2.micro, Amazon Linux 2 | i-096475e5a9daac12c |
| EC2 Security Group | HTTP/HTTPS/SSH | sg-005d3091a9dad6ff2 |
| RDS Instance | db.t3.micro, MySQL 8.0 | production-wordpress-db |
| RDS Security Group | MySQL 3306 | sg-0fd1e3734bc56113d |
| Elastic IP | Static IP | 54.85.194.30 |
| IAM Role | SSM Access | production-wordpress-ec2-role |
| DB Subnet Group | Multi-AZ | mealvana-endurance-wordpress-dbsubnetgroup-* |

### Software Stack

| Layer | Technology | Version |
|-------|------------|---------|
| OS | Amazon Linux 2 | Latest |
| Web Server | Apache | 2.4.x |
| PHP | PHP-FPM | 8.0.x |
| Database | MySQL | 8.0.x |
| CMS | WordPress | 6.x |
| Page Builder | Elementor | Latest |
| Theme | Hello Elementor | Latest |

### Security Configuration

| Port | Protocol | Source | Purpose |
|------|----------|--------|---------|
| 22 | SSH | 0.0.0.0/0 | Admin access (via SSM) |
| 80 | HTTP | 0.0.0.0/0 | Web traffic |
| 443 | HTTPS | 0.0.0.0/0 | Secure web traffic |
| 3306 | MySQL | EC2 SG only | Database access |

### Cost Analysis (Post Free Tier)

| Resource | Monthly Cost | Notes |
|----------|--------------|-------|
| EC2 t2.micro | $8.47 | 730 hours/month |
| RDS db.t3.micro | $12.41 | 730 hours/month |
| RDS Storage (20GB) | $2.30 | gp2 SSD |
| Elastic IP | $3.60 | Only if not attached |
| Data Transfer | $0.09/GB | First 100GB free |
| **Total** | **~$25-30** | After free tier |

---

## New Infrastructure: Astro on Vercel

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Developer Workflow                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐                                                    │
│  │   Local Dev     │                                                    │
│  │   Machine       │                                                    │
│  │                 │                                                    │
│  │  Astro Dev      │                                                    │
│  │  Keystatic      │                                                    │
│  │  localhost:4321 │                                                    │
│  └────────┬────────┘                                                    │
│           │                                                             │
│           │ git push                                                    │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │     GitHub      │                                                    │
│  │   Repository    │                                                    │
│  │                 │                                                    │
│  │  - Source code  │                                                    │
│  │  - Blog posts   │◀──── Keystatic commits content here               │
│  │  - Images       │                                                    │
│  └────────┬────────┘                                                    │
│           │                                                             │
│           │ Webhook trigger                                             │
│           ▼                                                             │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                            Vercel Platform                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │   Build System  │───▶│   Edge Network  │───▶│   Global CDN    │     │
│  │                 │    │                 │    │                 │     │
│  │  - npm install  │    │  - SSL/TLS      │    │  - 100+ PoPs    │     │
│  │  - astro build  │    │  - Edge Cache   │    │  - Auto-scaling │     │
│  │  - Optimize     │    │  - Compression  │    │  - DDoS protect │     │
│  └─────────────────┘    └─────────────────┘    └────────┬────────┘     │
│                                                          │              │
│                                                          │              │
│  ┌─────────────────┐                                     │              │
│  │ Serverless Fn   │◀─── Keystatic API routes ───────────┤              │
│  │ (Keystatic)     │                                     │              │
│  └─────────────────┘                                     │              │
│                                                          │              │
└──────────────────────────────────────────────────────────│──────────────┘
                                                           │
                                                           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              End Users                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    │
│   │   Website       │    │   Blog          │    │   Keystatic     │    │
│   │   Visitors      │    │   Readers       │    │   Editors       │    │
│   │                 │    │                 │    │                 │    │
│   │ endurance.      │    │ endurance.      │    │ endurance.      │    │
│   │ mealvana.io     │    │ mealvana.io/    │    │ mealvana.io/    │    │
│   │                 │    │ blog            │    │ keystatic       │    │
│   └─────────────────┘    └─────────────────┘    └─────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Astro 4.x | Static site generation |
| CMS | Keystatic | Content management |
| Styling | Tailwind CSS | Utility-first CSS |
| Hosting | Vercel | Deployment & CDN |
| Repository | GitHub | Version control |
| DNS | Squarespace | Domain management |

### Vercel Infrastructure (Managed)

| Component | Details | Cost |
|-----------|---------|------|
| Build Minutes | 6,000/month (Hobby) | Free |
| Bandwidth | 100GB/month | Free |
| Serverless Functions | 100GB-hours/month | Free |
| Edge Functions | 500,000 invocations | Free |
| SSL Certificate | Automatic | Free |
| CDN | 100+ global PoPs | Free |
| DDoS Protection | Included | Free |

### Security (Managed by Vercel)

| Feature | Status |
|---------|--------|
| SSL/TLS | Automatic (Let's Encrypt) |
| HTTP/2 | Enabled |
| DDoS Protection | Automatic |
| Security Headers | Configurable |
| WAF | Enterprise only |

---

## Comparison Matrix

### Performance

| Metric | WordPress/AWS | Astro/Vercel |
|--------|---------------|--------------|
| Time to First Byte (TTFB) | 200-500ms | 10-50ms |
| Largest Contentful Paint | 2-4s | 0.5-1.5s |
| Total Blocking Time | 100-500ms | 0ms |
| Cumulative Layout Shift | Variable | 0 |
| Lighthouse Score | 50-70 | 95-100 |

### Availability

| Metric | WordPress/AWS | Astro/Vercel |
|--------|---------------|--------------|
| SLA | 99.9% (EC2) | 99.99% (Vercel) |
| CDN | None (single region) | Global (100+ PoPs) |
| Auto-scaling | Manual | Automatic |
| Failover | None | Automatic |

### Security

| Feature | WordPress/AWS | Astro/Vercel |
|---------|---------------|--------------|
| Attack Surface | Large (PHP, MySQL, plugins) | Minimal (static files) |
| Patching Required | Yes (OS, PHP, WP, plugins) | No |
| Database Exposure | Yes (RDS) | No (Git-based) |
| DDoS Protection | Basic (SG) | Advanced (automatic) |

### Developer Experience

| Feature | WordPress/AWS | Astro/Vercel |
|---------|---------------|--------------|
| Local Development | Complex (Docker/LocalWP) | Simple (npm run dev) |
| Version Control | Plugin required | Native (Git) |
| Deployment | Manual/complex | Automatic (git push) |
| Rollback | Manual backup restore | One-click |
| Preview Deployments | No | Yes (every PR) |

### Content Editor Experience

| Feature | WordPress/Elementor | Astro/Keystatic |
|---------|---------------------|-----------------|
| Visual Editor | Yes (complex) | Yes (simple) |
| Learning Curve | Steep | Gentle |
| Real-time Preview | Yes | Yes |
| Mobile Editing | Difficult | Works |
| Collaboration | Plugin required | Built-in (GitHub) |

### Cost (Monthly)

| Item | WordPress/AWS | Astro/Vercel |
|------|---------------|--------------|
| Compute | $8.47 (EC2) | $0 |
| Database | $14.71 (RDS) | $0 |
| Storage | $2.30 (EBS/RDS) | $0 |
| Bandwidth | ~$1-5 | $0 |
| SSL | $0 (manual) | $0 (auto) |
| Domain | Already have | Already have |
| **Total** | **~$25-30** | **$0** |
| **Annual** | **~$300-360** | **$0** |

---

## Migration Complexity

### Data Migration

| Content Type | Complexity | Method |
|--------------|------------|--------|
| Blog Posts | Low | Convert HTML to Markdown |
| Images | Low | Copy to public folder |
| Pages | Medium | Rebuild in Astro |
| Forms | Low | Use Vercel Forms or Formspree |
| Comments | N/A | Not using currently |

### DNS Migration

| Step | Complexity | Downtime |
|------|------------|----------|
| Update A/CNAME record | Low | 0-48 hours propagation |
| SSL Certificate | None | Automatic |

### Rollback Risk

| Scenario | WordPress/AWS | Astro/Vercel |
|----------|---------------|--------------|
| Bad Deployment | Restore from backup | One-click rollback |
| Security Breach | Full investigation | N/A (no server) |
| Data Loss | Restore from RDS snapshot | Git history |

---

## Decision Matrix

### When to Choose WordPress/AWS

- [ ] Need complex e-commerce (WooCommerce)
- [ ] Need hundreds of plugins
- [ ] Team only knows WordPress
- [ ] Need real-time database queries
- [ ] Have dedicated DevOps team

### When to Choose Astro/Vercel

- [x] Simple marketing/blog site
- [x] Performance is critical
- [x] Want zero maintenance
- [x] Want zero hosting cost
- [x] Team can work with Git
- [x] Content doesn't change frequently
- [x] Want AI (Claude) to build/modify easily

---

## Conclusion

For the Mealvana Endurance marketing website:

| Criteria | Winner |
|----------|--------|
| Cost | Astro/Vercel ($0 vs $25/mo) |
| Performance | Astro/Vercel (10x faster) |
| Maintenance | Astro/Vercel (zero) |
| Security | Astro/Vercel (no server) |
| Developer Experience | Astro/Vercel (Git-native) |
| Editor Experience | Tie (both have visual editors) |
| Flexibility | WordPress (more plugins) |

**Recommendation**: Migrate to Astro/Vercel for this specific use case.

The WordPress/AWS setup makes sense for complex applications needing databases and real-time functionality. For a marketing site with a blog, it's overkill and unnecessarily expensive.
