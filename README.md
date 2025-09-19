# FUMI Voting System

A web-based voting application for the Federation For Uganda Medical Interns.

## Files Structure

- `index.html` - Main voting interface for voters
- `admin-portal.html` - Admin control panel
- `netlify.toml` - Deployment configuration
- `database-setup.sql` - Database schema for Supabase
- `auth.js` - Authentication functions
- `results.js` - Results calculation functions
- `styles.css` - Optional separated styles

## Setup Instructions

1. Create a Supabase project and run the SQL from `database-setup.sql`
2. Add your admin users to the `admin_users` table
3. Add candidates to the `candidates` table
4. Add voters to the `voters` table
5. Deploy to Netlify

## Admin Access

- Regular Admin: Can view results and generate reports
- Super Admin: Can manage elections, override votes, and manage candidates
