import { createClient } from '@supabase/supabase-js'

// Supabase configuration for Gravora GRC Platform
const supabaseUrl = 'https://qkrlwwahhghkfvptwgpc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrcmx3d2FoaGdoa2Z2cHR3Z3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MDg5NjksImV4cCI6MjA2OTE4NDk2OX0.Mb4ykOJ_zrp7ZzmgFRqhvJXTwOaZ77mXM7WC9Jfheq0'

// For development, we'll use a demo configuration
// In production, these would be environment variables
const DEMO_SUPABASE_URL = 'https://demo-gravora-grc.supabase.co'
const DEMO_SUPABASE_ANON_KEY = 'demo-key-for-development'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || DEMO_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY || DEMO_SUPABASE_ANON_KEY
)

// Database table names for Gravora GRC modules
export const TABLES = {
  ASSETS: 'assets',
  RISKS: 'risks', 
  CONTROLS: 'controls',
  COMPLIANCE_FRAMEWORKS: 'compliance_frameworks',
  AUDITS: 'audits',
  VENDORS: 'vendors',
  INCIDENTS: 'incidents',
  POLICIES: 'policies',
  BUSINESS_CONTINUITY: 'business_continuity',
  THREATS: 'threats',
  USERS: 'users',
  DOCUMENTS: 'documents',
  NOTIFICATIONS: 'notifications'
}

// GRC Module configurations
export const GRC_MODULES = {
  ASSET_REGISTRY: {
    name: 'Asset Registry',
    table: TABLES.ASSETS,
    icon: 'Server',
    description: 'Manage IT, physical, and information assets'
  },
  RISK_REGISTER: {
    name: 'Risk Register', 
    table: TABLES.RISKS,
    icon: 'AlertTriangle',
    description: 'Track and assess organizational risks'
  },
  CONTROL_LIBRARY: {
    name: 'Control Library',
    table: TABLES.CONTROLS, 
    icon: 'Shield',
    description: 'Manage security and compliance controls'
  },
  COMPLIANCE_FRAMEWORK: {
    name: 'Compliance Framework',
    table: TABLES.COMPLIANCE_FRAMEWORKS,
    icon: 'CheckSquare', 
    description: 'Track regulatory compliance requirements'
  },
  AUDIT_MANAGEMENT: {
    name: 'Audit Management',
    table: TABLES.AUDITS,
    icon: 'Search',
    description: 'Plan and execute internal and external audits'
  },
  VENDOR_MANAGEMENT: {
    name: 'Vendor Management', 
    table: TABLES.VENDORS,
    icon: 'Users',
    description: 'Assess and manage third-party vendors'
  },
  INCIDENT_MANAGEMENT: {
    name: 'Incident Management',
    table: TABLES.INCIDENTS,
    icon: 'AlertCircle',
    description: 'Track and respond to security incidents'
  },
  POLICY_MANAGEMENT: {
    name: 'Policy Management',
    table: TABLES.POLICIES,
    icon: 'FileText',
    description: 'Manage organizational policies and procedures'
  },
  BUSINESS_CONTINUITY: {
    name: 'Business Continuity',
    table: TABLES.BUSINESS_CONTINUITY, 
    icon: 'RefreshCw',
    description: 'Plan for business continuity and disaster recovery'
  },
  THREAT_INTELLIGENCE: {
    name: 'Threat Intelligence',
    table: TABLES.THREATS,
    icon: 'Eye',
    description: 'Monitor and analyze security threats'
  }
}

// Risk scoring configuration
export const RISK_SCORING = {
  LIKELIHOOD: {
    1: 'Very Low',
    2: 'Low', 
    3: 'Medium',
    4: 'High',
    5: 'Very High'
  },
  IMPACT: {
    1: 'Minimal',
    2: 'Minor',
    3: 'Moderate', 
    4: 'Major',
    5: 'Severe'
  },
  SCORE_RANGES: {
    LOW: { min: 1, max: 6, color: 'green' },
    MEDIUM: { min: 7, max: 12, color: 'yellow' },
    HIGH: { min: 13, max: 20, color: 'orange' },
    CRITICAL: { min: 21, max: 25, color: 'red' }
  }
}

// Compliance status options
export const COMPLIANCE_STATUS = {
  FULLY_COMPLIANT: 'Fully Compliant',
  PARTIALLY_COMPLIANT: 'Partially Compliant', 
  NON_COMPLIANT: 'Non-Compliant',
  NOT_APPLICABLE: 'Not Applicable',
  UNDER_REVIEW: 'Under Review'
}

// Asset criticality levels
export const ASSET_CRITICALITY = {
  CRITICAL: 'Critical',
  HIGH: 'High', 
  MEDIUM: 'Medium',
  LOW: 'Low'
}

