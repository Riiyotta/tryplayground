/* /blog and /changelog — measured at 1440.

   Both are long index feeds on the original, and both are capped here rather
   than reproduced entry for entry:

   - /blog carries 213 posts across 13 categories with 307 cover images. The
     first 8 posts per category are kept (94 posts), which renders the real
     category structure and grid without downloading 300+ covers for an index
     page.
   - /changelog measures 64,018px with 204 release entries - it lazy-loads far
     past the 4,266px a single viewport reports. The 24 most recent are kept,
     matching the page's own "Our latest releases" framing.

   Titles, categories and dates are the original's own. Where a feed is
   truncated the page says so, rather than implying it is the whole archive. */

export const blogIndex = {
  h1: 'Discover the latest in child care news',
  sub: 'Guides, research and product news for people running child care programs.',
  note: 'Showing the most recent posts per category.',
  categories: [
    { name: 'Latest', posts: [
      { t: 'A Decade of Change in How Adults Spend Time With Children at Home', img: '/assets/img/blog/a-decade-of-change-in-how-adults-s__kF0iJmbrFXjeRqSLU1OfoB6XnCE.webp' },
      { t: 'Procare Solutions Acquires Playground, Combining Industry Leading Expertise with Innovative, AI-Powered Child Care Techn', img: '/assets/img/blog/procare-solutions-acquires-playgro__mPpvbwYSFSGhNmKU4Zb6SfwNjVk.png' },
      { t: 'Child Care Tuition Prices in New Hampshire 2026: County Breakdown by Age and Center Types', img: '/assets/img/billing/a-child-care-facility-in-new-hamps__pmIjFuSMELDwFnm1dUx9ff12C7o.webp' },
      { t: 'The $9,000 Stay-at-Home Parent CCDF Proposal: What Child Care Directors Need to Know', img: '/assets/img/blog/the-9-000-stay-at-home-parent-ccdf__2Eo6ADQyVySN8ASmWPoFAavVm4g.webp' },
    ] },
    { name: 'Technology', posts: [
      { t: 'Best Childcare Management Software 2026: The Complete Vendor Landscape', img: '/assets/img/sol-ai/child-care-tech-map-showing-which-__w0x3OZu8tl2VdePf7KtTTvi7XE.png' },
      { t: 'Why Playground is the Best Child Care Management Software for Montessori Programs', img: '/assets/img/sol-ai/a-woman-works-on-a-laptop-building__H7COl7mjr19fNvK0tOpoySUAA.webp' },
      { t: 'Daycare Websites: Competitive Landscape, Analysis, and Best Practices to Turn Traffic to Tours', img: '/assets/img/sol-ai/the-outside-of-a-large-child-care-__k4in9AdyvvOfaM7d5it08qp8DnU.webp' },
      { t: 'Why Playground Is the Best Child Care Management Software for Small Centers', img: '/assets/img/sol-ai/people-sit-attentively-in-a-classr__2nkFFPYyW6NrfxrlNCzX25h6c.webp' },
      { t: 'Why Playground is the Best Child Care Management Software for Large Centers With 100+ Children', img: '/assets/img/sol-ai/an-image-of-a-computer-screen-focu__FJ3c1ZnK0SYRDFzWryNNdE82Rw.webp' },
      { t: 'How to Switch From Brightwheel to Playground: Migration Made Easy', img: '/assets/img/sol-ai/a-woman-sits-at-a-desk-in-front-of__CLAum2O29qnxSWkJwoqDLSRd9k.webp' },
      { t: 'Best Professional Development Courses for Early Childhood Educators and Directors', img: '/assets/img/blog/best-professional-development-cour__S0TTR8kDV43XphvMI73ccCJMguY.png' },
      { t: 'Best Payroll Software for Child Care, Daycare and Preschool Businesses \u2013 2026', img: '/assets/img/blog/best-payroll-software-for-child-ca__JQ93O2mw0NXVI7jzl98K39jUNo.webp' },
    ] },
    { name: 'Legislation', posts: [
      { t: 'The $9,000 Stay-at-Home Parent CCDF Proposal: What Child Care Directors Need to Know', img: '/assets/img/blog/the-9-000-stay-at-home-parent-ccdf__0dbGzKxFjF2SXWJIigMrHD0Quo.jpg' },
      { t: 'The Protecting Childcare from Private Equity Act: Implications for Independent Providers', img: '/assets/img/blog/the-protecting-childcare-from-priv__wHaHRmSqqSZaeuDCiVBpwmE9wG4.png' },
      { t: 'Military Child Care Expansion Proposals in the 2027 NDAA: What Directors Need to Know', img: '/assets/img/blog/military-child-care-expansion-prop__NiPC51tod2wV758KxNsIgo0MHc.png' },
      { t: 'Child Care \u0026 ECE Policy Roundup: Key Changes by State, July 2026', img: '/assets/img/blog/child-care-ece-policy-roundup-key-__tR1iw06uDZfLOSmYqiHDfoBW1w.png' },
      { t: 'House Passes Stop Child Care Scams Act: What It Means for Daycare Providers', img: '/assets/img/blog/house-passes-stop-child-care-scams__pfrsXOwVUQKjH4jjM89y677us.jpg' },
      { t: 'House Releases FY 2027 Proposal for CCDBG, Head Start, and PDG B-5', img: '/assets/img/sol-ai/children-play-in-a-montessori-envi__VW2wO1gkMOgvvfXjTFiJAe19t4.webp' },
      { t: 'New York Universal Child Care 2027: Funding, Subsidies \u0026 What\'s Changing', img: '/assets/img/sol-ai/a-daycare-director-holds-her-head-__W3NrQw1EMSyjW8V1CRQNnWJjE.webp' },
      { t: 'How the Child Care Modernization Act Could Strengthen Providers and Expand Access for Families', img: '/assets/img/sol-ai/img__E8RRmcA3508VZlNe38fXHug59o.webp' },
    ] },
    { name: 'Classroom Practice', posts: [
      { t: '6 Dia De Los Muertos Child Care Activity Ideas', img: '/assets/img/sol-ai/a-screenshot-from-the-user-interfa__CZEKUxowH2AXQromGB6x4GRjd74.webp' },
      { t: 'October Themes for Preschool - Themes, Lesson Plans \u0026 Ideas', img: '/assets/img/sol-ai/an-image-of-a-form-being-filled-ou__laDCDCu4XB1Y1OMBxfCUiVE0Hlc.webp' },
      { t: 'Preschool Halloween Snack \u0026 Treat Ideas', img: '/assets/img/sol-ai/a-woman-hands-a-check-over-a-count__z99qravyie32psQQyfcqEbXs.webp' },
      { t: '11 Fun and Creative Fall Leaf Activities for Preschoolers, Toddlers, and Kindergarten Kids', img: '/assets/img/blog/11-fun-and-creative-fall-leaf-acti__G20LjLyxp8qaWcgmRdqnxFD0QI.webp' },
      { t: '10 Thanksgiving Gratitude Songs for Kids', img: '/assets/img/blog/10-thanksgiving-gratitude-songs-fo__Hv7bqkW2ar7MyMILKzSHUik9E.webp' },
      { t: 'Top 15 Creative Fall Classroom Door Ideas', img: '/assets/img/blog/top-15-creative-fall-classroom-doo__yWwjE4ocgrlkF7MHtpTH8TfIDSM.png' },
      { t: '10 Easy and Fun Halloween Activities for Kids', img: '/assets/img/blog/10-easy-and-fun-halloween-activiti__setWox1gYpbqugIG5j0LWXSyOI.png' },
      { t: 'AMS Membership versus Accreditation: What\u2019s the Difference for Montessori Schools?', img: '/assets/img/blog/ams-membership-versus-accreditatio__5nE86nPrGwZo6eDZErWIl1ITVY.png' },
    ] },
    { name: 'State Programs', posts: [
      { t: 'California Child Care Compliance Infractions: Most Common Deficiencies and How to Avoid Them', img: '/assets/img/blog/california-child-care-compliance-i__Fj9D8tPPR4GQ2uCjJZ2AxODsmiw.jpg' },
      { t: 'Texas Child Care Licensing Violations: Most Common Deficiencies and How to Avoid Them', img: '/assets/img/blog/texas-child-care-licensing-violati__SCXvXnYUyDoPNc2BAA7m4B74.webp' },
      { t: 'Ohio Child Care Licensing Violations: Most Common Citations \u0026 How to Avoid Them', img: '/assets/img/blog/ohio-child-care-licensing-violatio__1iJghiJKslIQ4IkyFbPN8VwOUMA.webp' },
      { t: 'Which States Get the Most Enrollment Referrals From QRIS Systems?', img: '/assets/img/blog/which-states-get-the-most-enrollme__WWxm0VDlkiAciaVG72VCk8bChE.webp' },
      { t: 'Pennsylvania Keystone STARS: What Each Level Means, What You Can Earn, and How You Can Move Up', img: '/assets/img/blog/pennsylvania-keystone-stars-what-e__VQeV1e7HbNIoa15yTAgbevBI.png' },
      { t: 'Playground is Free For Indiana\'s Child Care Providers', img: '/assets/img/blog/playground-is-free-for-indiana-s-c__Ak0OWkoyh24Vi0eQ7q1kZ7yJNys.png' },
      { t: 'Iowa Child Care Provider Stipend', img: '/assets/img/blog/iowa-child-care-provider-stipend__uZmgWPnRHJM3vra7xvBZ7YDX2w.jpg' },
      { t: 'Licensed Kansas Child Care Providers Receive Playground Free For 14 Months', img: '/assets/img/blog/licensed-kansas-child-care-provide__1Zy6ReK5ibi5cCu1Gv7aLs5UpzQ.webp' },
    ] },
    { name: 'Subsidy \u0026 Funding', posts: [
      { t: 'CACFP Reimbursement Rates Updated for July 1, 2026 \u2013 June 30, 2027', img: '/assets/img/blog/cacfp-reimbursement-rates-updated-__oTr9zgyNXcLYExmjynU24BgdSKc.webp' },
      { t: 'QRIS Guide for Child Care Directors: State Contacts and Ratings Explained', img: '/assets/img/blog/qris-guide-for-child-care-director__YRpuPz4uCsny7rc0FKlljGMJq0.webp' },
      { t: 'CACFP Meal Ideas by Age: Compliant Breakfasts, Lunches, Snacks, and Suppers for Infants Through Age 5', img: '/assets/img/blog/cacfp-meal-ideas-by-age-compliant-__fMBvu7dVUqQ1OOrZBLWVxDj8JwI.webp' },
      { t: 'Stop Leaving Subsidy Money on the Table: The Hidden Cost of Manual Meal Reporting with CACFP', img: '/assets/img/blog/stop-leaving-subsidy-money-on-the-__FI9gvYFWSEVPBdk9LeJBJ1I9tH0.jpg' },
      { t: 'Child Care Subsidies and Grants in 2026: How to Grow Your Business With Funding Programs', img: '/assets/img/blog/child-care-subsidies-and-grants-in__Q3ARq7qzrlrLIQjeoZE3F4tcE.webp' },
      { t: 'Child Care and Development Fund (CCDF) Contacts by State: Information and Applications', img: '/assets/img/blog/child-care-and-development-fund-cc__0QuhPKp6LRQoouzFlbKFZAh77G8.jpg' },
      { t: 'Child Care and Development Fund (CCDF): Complete Guide to Subsidies, Provider Payments, and Quality Improvements', img: '/assets/img/blog/child-care-and-development-fund-cc__gDoMIjOzdkWMpUx7dbs41GkIc9Q.jpg' },
      { t: 'Child Care and Development Block Grant (CCDBG): Opportunities, Compliance, Funding and Applications', img: '/assets/img/blog/child-care-and-development-block-g__PGFPWRafjBKkEIVPt4Rln2x7CQ.jpg' },
    ] },
    { name: 'Staff', posts: [
      { t: 'State-Funded Pre-K Professional Development Requirements for Teachers', img: '/assets/img/blog/state-funded-pre-k-professional-de__Zx8D78Zt4Fi66KFdBAIQgqXFF1Q.jpg' },
      { t: 'The Complete CDA Credential Breakdown: Requirements, Salary \u0026 Retention Impact', img: '/assets/img/blog/the-complete-cda-credential-breakd__iGTABVg1BIn0h82Yp4sNo2FWizw.webp' },
      { t: 'Upcoming Early Childhood Education Conferences and Events for Late 2026', img: '/assets/img/blog/upcoming-early-childhood-education__eql4EZUqFTkfVG0Fd7diZ9W84o.png' },
      { t: 'Top 10 Books for Early Childhood Educators: Child, Teacher, and Business Development', img: '/assets/img/blog/top-10-books-for-early-childhood-e__G6ISfawlCleqI0fff0Rs5PS7haY.jpg' },
      { t: 'Paid Family Leave for Daycare Staff: What to Know in 2026', img: '/assets/img/blog/paid-family-leave-for-daycare-staf__HlgnHehabPVYjbqM12zl9MadTI.png' },
      { t: 'Hiring (and Retaining) Mission-Aligned Staff at a Christian Child Care Program', img: '/assets/img/blog/hiring-and-retaining-mission-align__sXCqKE7d3iEVVZGdvFcw5Mtaw8.png' },
      { t: 'Daycare Employee Benefits: The Complete Guide for Child Care Owners \u0026 Directors', img: '/assets/img/blog/daycare-employee-benefits-the-comp__E4fpI9qrWzrPLVDlQEbjDdjHwLk.png' },
      { t: 'Why Your Teachers Are Leaving Your Child Care (And What the Best Operators Are Doing About It)', img: '/assets/img/blog/why-your-teachers-are-leaving-your__L7ItCvODFAffSEY41ifpQt0sJKk.png' },
    ] },
    { name: 'Operations', posts: [
      { t: 'Child Care Record Retention Guide: What to Store, How Long, and Why Paper Costs More', img: '/assets/img/blog/child-care-record-retention-guide-__JVvL6Hv3aUfHMlnxkJZpnFREcY.png' },
      { t: 'What Is the Right NAICS Code for a Child Care or Daycare Business?', img: '/assets/img/blog/what-is-the-right-naics-code-for-a__FcX8AV3R149sGhlLowGIjN0Lxn4.jpg' },
      { t: 'How Much Does It Cost to Open a Child Care Business?', img: '/assets/img/blog/how-much-does-it-cost-to-open-a-ch__jX6Da19kZ6bhU0BvuEuYsqRBYT8.png' },
      { t: 'The Ultimate Guide to Child Care Licensing Requirements in Massachusetts', img: '/assets/img/blog/the-ultimate-guide-to-child-care-l__v4UgNwAZFJ353Y22JZ4PoC19o.jpg' },
      { t: 'Why Playground is the best Child Care Management Software', img: '/assets/img/blog/why-playground-is-the-best-child-c__gklCkbvElvlSXB5Fyw8gHcMYS6g.jpg' },
      { t: '7 Childcare Trends Every Provider Needs to Know in 2026', img: '/assets/img/blog/7-childcare-trends-every-provider-__p9ABIndNavs16ktLpIby8zajY.jpg' },
      { t: 'Best Arise Attendance App Alternative for Utah Child Care Providers', img: '/assets/img/blog/best-arise-attendance-app-alternat__yf1IXg3w9ivniCOTpQFOZAGd9Mk.png' },
      { t: 'Where to Buy Cheap Daycare Supplies in 2026 (Better Than Amazon \u0026 Sam\u2019s Club)', img: '/assets/img/blog/where-to-buy-cheap-daycare-supplie__8yU0aSEJAIONL8Shm2b8vxEzs0c.png' },
    ] },
    { name: 'Data Insights', posts: [
      { t: 'Child Care Provider Businesses and Child Enrollment Capacity by State \u2013 2026 Study', img: '/assets/img/blog/child-care-provider-businesses-and__p4Zoctkm22FV9gmiHuw3kzlvR8U.png' },
      { t: 'CCDF Participation by State: How Providers and Families Use Child Care Subsidy Funds', img: '/assets/img/blog/ccdf-participation-by-state-how-pr__e71Kh2IbkeF5cgZIgYUKRDasFE.png' },
      { t: 'Summer Child Care Trends 2026: How Directors Are Adapting Staffing, Enrollment \u0026 Pricing', img: '/assets/img/blog/summer-child-care-trends-2026-how-__k78pnVcGuAIOe2o71o5VNm14a0.png' },
      { t: 'States Where Stay-at-Home Parents Are Most Common \u2013 2026 Study', img: '/assets/img/blog/states-where-stay-at-home-parents-__1pY6aYHFVD0Uo9hOjIjqBdDm0.png' },
      { t: 'The Childcare Workforce Gap: Staffing Shortages by State \u2013 2026 Study', img: '/assets/img/blog/the-childcare-workforce-gap-staffi__mWx8m3AZ4mi1WsyQ9jn0Th8fr0M.png' },
      { t: 'Understanding KPIs in Child Care', img: '/assets/img/blog/understanding-kpis-in-child-care__Iw1rkZ9o7ybILF47tKfYTEjCr1s.png' },
      { t: 'Understanding Staff Retention Metrics in ECE', img: '/assets/img/blog/understanding-staff-retention-metr__qs51RHiuWUv8t3aASGiNII88.jpg' },
    ] },
    { name: 'Marketing', posts: [
      { t: 'Reviews Strategy for Child Care Directors: How to Build Social Proof to Grow Enrollment', img: '/assets/img/blog/reviews-strategy-for-child-care-di__XIVgp46OHAUbXr6d7tz2yTmfkB4.jpg' },
      { t: 'Is NAEYC Accreditation Worth It for Child Care Providers?', img: '/assets/img/blog/is-naeyc-accreditation-worth-it-fo__reKmy48x4oNuam8aPbrR0zWVz0k.jpg' },
      { t: 'Back-to-School Enrollment Strategies for Child Care Providers: Fill More Spots Before September', img: '/assets/img/blog/back-to-school-enrollment-strategi__9w8keexFE5NEW8MF3VnkCIUkkRw.jpg' },
      { t: 'Developing an Ideal Customer Profile (ICP) for Your Child Care or Daycare Business', img: '/assets/img/blog/developing-an-ideal-customer-profi__tO0yuBc0B3cojxcGeYZE6pdN8qs.jpg' },
      { t: 'SEO \u0026 GEO for Daycare Providers: How to Get Found in Online and AI Search Results', img: '/assets/img/blog/seo-geo-for-daycare-providers-how-__PBKORWHk4Sm6blsbSdb2p97u0w.png' },
      { t: '11 Proven Strategies to Market Your Daycare Business', img: '/assets/img/blog/11-proven-strategies-to-market-you__o2imytAR1e1EBmKHsIZreH5jJU.jpg' },
      { t: 'Daycare, Preschool and Childcare Name Ideas', img: '/assets/img/blog/daycare-preschool-and-childcare-na__pSwXWyQBn9GtfyU6ny4xJwsHE0.jpg' },
      { t: 'How to Increase Child Care Enrollment in 2026: 5 Proven Strategies (with Real Examples)', img: '/assets/img/blog/how-to-increase-child-care-enrollm__6jP2cOyOXqblMTU74A8F1dsDs14.jpg' },
    ] },
    { name: 'Family', posts: [
      { t: 'A Decade of Change in How Adults Spend Time With Children at Home', img: '/assets/img/blog/a-decade-of-change-in-how-adults-s__cEac7o8ApAPzg2pQBURGOZ61PGI.jpg' },
      { t: 'Why Parent Advisory Committees Matter in Child Care', img: '/assets/img/blog/why-parent-advisory-committees-mat__EjsNcnWY6WBAMsjNbHvi8lvjU.jpg' },
      { t: 'How to Handle Difficult Conversations with Parents', img: '/assets/img/blog/how-to-handle-difficult-conversati__Olha2ZLpkR1jvekYafGeKLROTE.jpg' },
      { t: 'How to Source Parent Input (and How to Use It)', img: '/assets/img/blog/how-to-source-parent-input-and-how__BlcLFbJUWiW9QZelQypI0ckeLJw.jpg' },
      { t: 'What is a Childcare CRM?', img: '/assets/img/blog/what-is-a-childcare-crm__WMsKASSSH5DVEetWqaAHV1sc4.jpg' },
      { t: 'The Power of Community in Child Care', img: '/assets/img/blog/the-power-of-community-in-child-ca__NnAwrDqlcUAXn1lTDwJyXl8YzA.jpg' },
      { t: '5 Types of Diversity in a Childcare Program', img: '/assets/img/blog/5-types-of-diversity-in-a-childcar__xqjBvdivKYvS7jwO9y7DggNSLQs.jpg' },
      { t: 'What is Drop-In Child Care? How to Service Parents in a Pinch', img: '/assets/img/blog/what-is-drop-in-child-care-how-to-__mXPUxsqMlmrsJcCUnj72saGfcCU.jpg' },
    ] },
    { name: 'Finances', posts: [
      { t: 'Child Care Tuition Prices in New Hampshire 2026: County Breakdown by Age and Center Types', img: '/assets/img/blog/child-care-tuition-prices-in-new-h__zaEbQc7u4TsxhXQflmhILCVlMc.jpg' },
      { t: 'Child Care Tuition Prices in Oklahoma 2026: County Breakdown by Age and Center Types', img: '/assets/img/blog/child-care-tuition-prices-in-oklah__4wiTYuzGyj5eMDcN1hmE0kG7xg.jpg' },
      { t: 'Child Care Tuition Prices in Kansas 2026: County Breakdown by Age and Center Types', img: '/assets/img/blog/child-care-tuition-prices-in-kansa__SJdCioNGpxIcw7K4MpY5jLOUmQ.jpg' },
      { t: 'Child Care Tuition Prices in Wyoming 2026: County Breakdown by Age and Center Types', img: '/assets/img/blog/child-care-tuition-prices-in-wyomi__YuB62D6uTs34YVoRbCGOGPT6HQ.jpg' },
      { t: 'Child Care Tuition Prices in Michigan 2026: County Breakdown by Age and Center Types', img: '/assets/img/blog/child-care-tuition-prices-in-michi__4FbWIVLB917WtLu0wVPk6yCcbRQ.jpg' },
      { t: 'Child Care Tuition Prices in Colorado 2026: County Breakdown by Age and Center Types', img: '/assets/img/blog/child-care-tuition-prices-in-color__4ROsMyIiQp1dbRdmaT5mnYPAK1Q.jpg' },
      { t: 'Child Care Tuition Prices in Utah 2026: County Breakdown by Age and Center Types', img: '/assets/img/blog/child-care-tuition-prices-in-utah-__KTBQgNUp54ckKpwRjjhHrxjxk.jpg' },
      { t: 'Child Care Tuition Prices in Minnesota 2026: County Breakdown by Age and Center Types', img: '/assets/img/blog/child-care-tuition-prices-in-minne__yXRDW5Us40EwOCzniKEDoMQIY.jpg' },
    ] },
    { name: 'Playground', posts: [
      { t: 'Procare Solutions Acquires Playground, Combining Industry Leading Expertise with Innovative, AI-Powered Child Care Techn', img: '/assets/img/blog/procare-solutions-acquires-playgro__D6EaFZgQQtBKRL0nToRnqzR4M.jpg' },
      { t: 'Why Playground Is Best for Multilingual Child Care Centers', img: '/assets/img/blog/why-playground-is-best-for-multili__NzyAzk9dHNVAkOGM6xp3V0snss.jpg' },
      { t: 'From Zero to 21 Locations: How Playground Helped Jason Lody Build a Profitable Child Care Empire in 18 Months', img: '/assets/img/blog/from-zero-to-21-locations-how-play__cE1qOBawHL69MDjTdD46vN8j0.jpg' },
    ] },
  ],
}

export const changelogIndex = {
  h1: 'Product updates',
  sub: '886 updates in the last 12 months (and counting)',
  heading: 'Our latest releases',
  note: 'Showing the 24 most recent releases of 204.',
  entries: [
    { t: 'Call Support for API, Coming Due Paperwork Report, \u0026 Bulk Photo Downloads', date: 'Sep 16, 2026', img: '/assets/img/changelog/img__EOMJvkfHJ4YDnruYgAN1ug69g.png' },
    { t: 'Multiple Overage Fees \u0026 Ability to Disable Enterprise Accounts', date: 'Sep 16, 2026', img: '/assets/img/changelog/img__XjlbFRhFDPgARncHDuwiqyuGM.png' },
    { t: 'CRM Inbox, API for Forms, Lesson Planning on Mobile', date: 'Aug 31, 2026', img: '/assets/img/changelog/img__BdCvyvdegl5VGRNHZsmvlLsSNyc.png' },
    { t: 'Scheduled Reports, Duplicate Management, \u0026 Better Lesson Activities', date: 'Aug 31, 2026', img: '/assets/img/changelog/add-activities__gpDLpTdpDFsrs1UwA1sG7Hj4ls4.png' },
    { t: 'Show Staff Development Days \u0026 Edit Lesson Activities From Mobile', date: 'Aug 17, 2026', img: '/assets/img/changelog/staff-development-days__2Iu8FoPiLy13QHzK8VkLzXZaY8E.png' },
    { t: 'Better Family Push Notifications \u0026 Updated Kiosk on Web', date: 'Aug 17, 2026', img: '/assets/img/changelog/better-push-notifications__ew2upKA52ImrmzBuz28hGvX2Ur4.png' },
    { t: 'Tap to Pay on Iphone, Percentage Based Split Payments, and Restore Deleted Payments \u0026 Credits', date: 'Aug 3, 2026', img: '/assets/img/changelog/restore-deleted-payments-and-credi__IC9fGfZrFCtjA9KX8tAxms2aG0.png' },
    { t: 'Food Program Claims, CRM Daily Digest, Automatic Lead Creation from Calls, \u0026 New Kiosk Design', date: 'Aug 3, 2026', img: '/assets/img/changelog/cacfp-claim-management__byGtYKFsd3e9OKPtKEw2QJ08E.png' },
    { t: 'Disable ACH for Individual Families, Newsletter Attachments, API for Attendance, \u0026 New FTE Forecast Report', date: 'Jul 13, 2026', img: '/assets/img/changelog/img__4jiZnr0hSBznrfAqasz7nYKtqLU.png' },
    { t: 'Better Lead Organization \u0026 More Bi-Monthly Billing Support', date: 'Jul 13, 2026', img: '/assets/img/changelog/img__br97t5QyOTgI3vTWizgEQJRA8ds.png' },
    { t: 'Dynamic Student Based Chats Beta, Automatic Food Program Menu Building \u0026 Recurring Calendar Event Settings', date: 'Jun 29, 2026', img: '/assets/img/changelog/img__T7jTNzcrTOsIzdEpvgUyioJPd0.png' },
    { t: 'Bulk Create Chats, Report Finder, Updated Billing Settings', date: 'Jun 29, 2026', img: '/assets/img/changelog/img__RqHJ3YS1UpSzHZbPflkfO0JTGw.png' },
    { t: 'Enterprise Schedule Templates, CRM API Improvement, \u0026 Easier to Update Subsidy Rates', date: 'Jun 15, 2026', img: '/assets/img/changelog/img__Y7Msk1TFIUabPlMV2U7Z6cdzWr0.png' },
    { t: 'Enterprise Chat \u0026 Locking Staff Hour Records', date: 'Jun 15, 2026', img: '/assets/img/changelog/multi-site-chat__iS7qeFG95laJGK0shiLEM8obdI.png' },
    { t: 'Bimonthly Billing Support, Scheduled CRM Texts, Merge Duplicate Leads', date: 'Jun 8, 2026', img: '/assets/img/changelog/bimonthly-billing__6vrNJJ8XgDlMa5Ti2B1VTtKL7A.png' },
    { t: 'Saved Views, Tour Booking Calendar, \u0026 Scheduled Email Campaigns', date: 'Jun 8, 2026', img: '/assets/img/changelog/tour-booking-calendar-view__iK5PanfhSAG3Fx0uOWzSMXNA.png' },
    { t: 'Improved Texting, Phone Block List, \u0026 Bulk Cash Payments', date: 'May 25, 2026', img: '/assets/img/changelog/img__k0cvTfhwu3Cj7Zpu5Yq24lPDc0.png' },
    { t: 'Meeting Rescheduling, Payment Permissions, \u0026 AI Agent Conversation History', date: 'May 25, 2026', img: '/assets/img/changelog/img__MbB8zFWPCgN5eyfEZgAtqj8bgE.png' },
    { t: 'Rescheduling Tours, Payment Audits, \u0026 CRM Call Recording', date: 'May 11, 2026', img: '/assets/img/changelog/img__k3rb6IpgsW7H3Cu296iNZYLdHo.png' },
    { t: 'Settings Audit Log, Caller ID Customization, \u0026 Better Billing Plan Deletions', date: 'May 11, 2026', img: '/assets/img/changelog/img__FzFPLGym8UbzABcSVs7f4F5m1cg.png' },
    { t: 'Geofenced Door Access, Web Observations, \u0026 Smarter CRM', date: 'Apr 27, 2026', img: '/assets/img/changelog/geofencing__wni0OgvqVGAU43TsayJXIpLLbI.png' },
    { t: 'New Dialer, Bi-weekly Support, \u0026 AI Suggested Tasks', date: 'Apr 27, 2026', img: '/assets/img/changelog/suggested-tasks__KuWrNHhsjvAY0S6is1RoBHarI.png' },
    { t: 'Clearer Refunds \u0026 Improved Caller ID Capabilities', date: 'Apr 13, 2026', img: '/assets/img/changelog/new-refund-flow__BJhKWEzxwyOMsK4p9T4Bm8kSw0.png' },
    { t: 'Enterprise Custom Reports \u0026 Bulk SMS Sending For Leads', date: 'Apr 13, 2026', img: '/assets/img/changelog/bulk-text-messages__ejuJQ5qcI1MhqvdQPxDbxK0NuoE.png' },
  ],
}
