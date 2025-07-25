import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Save,
  RefreshCw,
  Database,
  Link2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

const ImportModal = ({ 
  isOpen, 
  onClose, 
  onImport, 
  moduleType, 
  sampleData,
  integrationOptions = []
}) => {
  const [importMethod, setImportMethod] = useState('file'); // 'file', 'api', 'manual'
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState('');
  const [mappingData, setMappingData] = useState([]);
  const [importStep, setImportStep] = useState(1); // 1: Upload, 2: Map, 3: Validate, 4: Import
  const [validationResults, setValidationResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState('');
  const [apiConfig, setApiConfig] = useState({
    endpoint: '',
    apiKey: '',
    format: 'json'
  });
  
  const fileInputRef = useRef(null);

  const moduleConfigs = {
    assets: {
      title: 'Asset Import',
      description: 'Import assets from CSV, Excel, or external systems',
      requiredFields: ['name', 'category', 'owner', 'criticality'],
      optionalFields: ['location', 'description', 'status'],
      sampleCsv: 'name,category,owner,criticality,location,description\nDatabase Server,Database,IT Team,Critical,Data Center A,Primary production database\nWeb Server,Server,DevOps,High,Cloud AWS,Customer web application'
    },
    risks: {
      title: 'Risk Import',
      description: 'Import risks from CSV, Excel, or risk management systems',
      requiredFields: ['title', 'category', 'likelihood', 'impact'],
      optionalFields: ['owner', 'description', 'mitigationStrategy'],
      sampleCsv: 'title,category,likelihood,impact,owner,description\nData Breach,Security,4,5,Security Team,Risk of unauthorized data access\nSystem Downtime,Operational,2,4,IT Team,Risk of system unavailability'
    },
    controls: {
      title: 'Control Import',
      description: 'Import controls from CSV, Excel, or compliance frameworks',
      requiredFields: ['name', 'category', 'framework', 'controlType'],
      optionalFields: ['status', 'effectiveness', 'owner', 'description'],
      sampleCsv: 'name,category,framework,controlType,status,effectiveness,owner\nAccess Control,Security,ISO 27001,Preventive,Implemented,Effective,IT Security\nBackup Procedures,Resilience,ISO 27001,Corrective,Implemented,Effective,IT Ops'
    },
    policies: {
      title: 'Policy Import',
      description: 'Import policies from document management systems',
      requiredFields: ['title', 'category', 'status'],
      optionalFields: ['owner', 'description', 'effectiveDate', 'reviewDate'],
      sampleCsv: 'title,category,status,owner,effectiveDate,reviewDate\nInformation Security Policy,Security,Active,CISO,2024-01-01,2024-12-31\nIncident Response Policy,Operational,Active,IT Manager,2024-01-01,2024-12-31'
    },
    vendors: {
      title: 'Vendor Import',
      description: 'Import vendor data from procurement or ERP systems',
      requiredFields: ['name', 'category', 'riskLevel'],
      optionalFields: ['contactEmail', 'contractStart', 'contractEnd', 'services'],
      sampleCsv: 'name,category,riskLevel,contactEmail,services\nCloud Provider,Technology,Medium,contact@cloudprovider.com,Infrastructure Hosting\nSecurity Vendor,Security,Low,support@securityvendor.com,Vulnerability Scanning'
    }
  };

  const integrationTemplates = {
    'servicenow': {
      name: 'ServiceNow',
      description: 'Import from ServiceNow CMDB/GRC',
      endpoint: 'https://your-instance.service-now.com/api/now/table/',
      fields: ['name', 'category', 'state', 'assigned_to']
    },
    'archer': {
      name: 'RSA Archer',
      description: 'Import from RSA Archer GRC',
      endpoint: 'https://your-archer.com/api/core/content/',
      fields: ['Title', 'Risk_Category', 'Likelihood', 'Impact']
    },
    'qualys': {
      name: 'Qualys VMDR',
      description: 'Import vulnerability data',
      endpoint: 'https://qualysapi.qualys.com/api/2.0/fo/asset/',
      fields: ['ip', 'dns', 'os', 'last_scan_datetime']
    },
    'active_directory': {
      name: 'Active Directory',
      description: 'Import user and computer objects',
      endpoint: 'ldap://your-domain.com',
      fields: ['cn', 'distinguishedName', 'memberOf', 'lastLogon']
    },
    'aws': {
      name: 'AWS Config',
      description: 'Import AWS resources',
      endpoint: 'https://config.amazonaws.com/',
      fields: ['resourceId', 'resourceType', 'region', 'tags']
    }
  };

  const config = moduleConfigs[moduleType] || moduleConfigs.assets;

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      
      // Read file content for CSV preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setCsvData(content);
        parseCSVForMapping(content);
      };
      reader.readAsText(uploadedFile);
    }
  };

  const parseCSVForMapping = (csvContent) => {
    const lines = csvContent.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      const headers = lines[0].split(',').map(h => h.trim());
      const sampleRow = lines[1] ? lines[1].split(',').map(r => r.trim()) : [];
      
      const mapping = headers.map((header, index) => ({
        csvField: header,
        sampleValue: sampleRow[index] || '',
        mappedTo: findBestMatch(header, [...config.requiredFields, ...config.optionalFields]),
        required: config.requiredFields.includes(findBestMatch(header, config.requiredFields))
      }));
      
      setMappingData(mapping);
      setImportStep(2);
    }
  };

  const findBestMatch = (csvField, availableFields) => {
    const field = csvField.toLowerCase();
    const matches = availableFields.filter(af => 
      af.toLowerCase().includes(field) || field.includes(af.toLowerCase())
    );
    return matches.length > 0 ? matches[0] : '';
  };

  const validateData = () => {
    setIsProcessing(true);
    
    // Simulate validation process
    setTimeout(() => {
      const lines = csvData.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      const dataRows = lines.slice(1);
      
      const results = dataRows.map((row, index) => {
        const values = row.split(',').map(v => v.trim());
        const errors = [];
        const warnings = [];
        
        // Check required fields
        config.requiredFields.forEach(field => {
          const mapping = mappingData.find(m => m.mappedTo === field);
          if (mapping) {
            const valueIndex = headers.indexOf(mapping.csvField);
            if (valueIndex === -1 || !values[valueIndex]) {
              errors.push(`Missing required field: ${field}`);
            }
          } else {
            errors.push(`Required field not mapped: ${field}`);
          }
        });
        
        // Add some sample warnings
        if (values.length !== headers.length) {
          warnings.push('Column count mismatch');
        }
        
        return {
          row: index + 1,
          data: values,
          errors,
          warnings,
          status: errors.length === 0 ? 'valid' : 'error'
        };
      });
      
      setValidationResults(results);
      setImportStep(3);
      setIsProcessing(false);
    }, 2000);
  };

  const executeImport = () => {
    setIsProcessing(true);
    
    // Simulate import process
    setTimeout(() => {
      const validRows = validationResults.filter(r => r.status === 'valid');
      const importedData = validRows.map(row => {
        const item = {};
        mappingData.forEach(mapping => {
          if (mapping.mappedTo) {
            const csvIndex = csvData.split('\n')[0].split(',').indexOf(mapping.csvField);
            item[mapping.mappedTo] = row.data[csvIndex];
          }
        });
        return item;
      });
      
      onImport(importedData);
      setIsProcessing(false);
      onClose();
    }, 1500);
  };

  const downloadSampleTemplate = () => {
    const blob = new Blob([config.sampleCsv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${moduleType}_import_template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleApiImport = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock API response
      const mockData = [
        { name: 'API Asset 1', category: 'Server', owner: 'API Team' },
        { name: 'API Asset 2', category: 'Database', owner: 'API Team' }
      ];
      
      onImport(mockData);
      setIsProcessing(false);
      onClose();
    } catch (error) {
      console.error('API import failed:', error);
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">{config.title}</h3>
            <p className="text-slate-400">{config.description}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="border-slate-600 text-slate-300"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Import Method Selection */}
        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <Button
              variant={importMethod === 'file' ? 'default' : 'outline'}
              onClick={() => setImportMethod('file')}
              className={importMethod === 'file' ? 'bg-blue-600' : 'border-slate-600 text-slate-300'}
            >
              <FileText className="w-4 h-4 mr-2" />
              File Upload
            </Button>
            <Button
              variant={importMethod === 'api' ? 'default' : 'outline'}
              onClick={() => setImportMethod('api')}
              className={importMethod === 'api' ? 'bg-blue-600' : 'border-slate-600 text-slate-300'}
            >
              <Database className="w-4 h-4 mr-2" />
              API Integration
            </Button>
            <Button
              variant={importMethod === 'manual' ? 'default' : 'outline'}
              onClick={() => setImportMethod('manual')}
              className={importMethod === 'manual' ? 'bg-blue-600' : 'border-slate-600 text-slate-300'}
            >
              <Link2 className="w-4 h-4 mr-2" />
              External Systems
            </Button>
          </div>
        </div>

        {/* File Upload Method */}
        {importMethod === 'file' && (
          <div className="space-y-6">
            {importStep === 1 && (
              <div>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-white mb-2">Upload CSV or Excel File</h4>
                  <p className="text-slate-400 mb-4">
                    Drag and drop your file here, or click to browse
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Choose File
                  </Button>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      onClick={downloadSampleTemplate}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Sample Template
                    </Button>
                  </div>
                </div>

                {file && (
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-white font-medium">{file.name}</p>
                            <p className="text-slate-400 text-sm">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => setImportStep(2)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Next: Map Fields
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {importStep === 2 && (
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Map CSV Fields</h4>
                <div className="space-y-3">
                  {mappingData.map((mapping, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 items-center p-3 bg-slate-700/30 rounded">
                      <div>
                        <p className="text-white font-medium">{mapping.csvField}</p>
                        <p className="text-slate-400 text-sm">{mapping.sampleValue}</p>
                      </div>
                      <div>
                        <select
                          value={mapping.mappedTo}
                          onChange={(e) => {
                            const newMapping = [...mappingData];
                            newMapping[index].mappedTo = e.target.value;
                            setMappingData(newMapping);
                          }}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                        >
                          <option value="">-- Select Field --</option>
                          {[...config.requiredFields, ...config.optionalFields].map(field => (
                            <option key={field} value={field}>{field}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        {mapping.required && (
                          <span className="px-2 py-1 bg-red-900/30 text-red-300 rounded text-xs">
                            Required
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setImportStep(1)}
                    className="border-slate-600 text-slate-300"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={validateData}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next: Validate Data
                  </Button>
                </div>
              </div>
            )}

            {importStep === 3 && (
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Validation Results</h4>
                {isProcessing ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-4" />
                    <p className="text-white">Validating data...</p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 grid grid-cols-3 gap-4">
                      <Card className="bg-green-900/20 border-green-700">
                        <CardContent className="p-4 text-center">
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                          <p className="text-green-400 font-medium">
                            {validationResults.filter(r => r.status === 'valid').length} Valid
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-red-900/20 border-red-700">
                        <CardContent className="p-4 text-center">
                          <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                          <p className="text-red-400 font-medium">
                            {validationResults.filter(r => r.status === 'error').length} Errors
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-yellow-900/20 border-yellow-700">
                        <CardContent className="p-4 text-center">
                          <AlertCircle className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                          <p className="text-yellow-400 font-medium">
                            {validationResults.reduce((sum, r) => sum + r.warnings.length, 0)} Warnings
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {validationResults.map((result, index) => (
                        <div key={index} className={`p-3 rounded border ${
                          result.status === 'valid' 
                            ? 'bg-green-900/20 border-green-700' 
                            : 'bg-red-900/20 border-red-700'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-white">Row {result.row}</span>
                            {result.status === 'valid' ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          {result.errors.length > 0 && (
                            <div className="mt-2">
                              {result.errors.map((error, i) => (
                                <p key={i} className="text-red-300 text-sm">• {error}</p>
                              ))}
                            </div>
                          )}
                          {result.warnings.length > 0 && (
                            <div className="mt-2">
                              {result.warnings.map((warning, i) => (
                                <p key={i} className="text-yellow-300 text-sm">• {warning}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setImportStep(2)}
                        className="border-slate-600 text-slate-300"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={executeImport}
                        disabled={validationResults.filter(r => r.status === 'valid').length === 0}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Import {validationResults.filter(r => r.status === 'valid').length} Records
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* API Integration Method */}
        {importMethod === 'api' && (
          <div className="space-y-6">
            <Card className="bg-slate-700/50 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">API Configuration</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure API endpoint and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">API Endpoint</label>
                  <Input
                    value={apiConfig.endpoint}
                    onChange={(e) => setApiConfig({...apiConfig, endpoint: e.target.value})}
                    placeholder="https://api.example.com/data"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">API Key</label>
                  <Input
                    type="password"
                    value={apiConfig.apiKey}
                    onChange={(e) => setApiConfig({...apiConfig, apiKey: e.target.value})}
                    placeholder="Your API key"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Data Format</label>
                  <select
                    value={apiConfig.format}
                    onChange={(e) => setApiConfig({...apiConfig, format: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  >
                    <option value="json">JSON</option>
                    <option value="xml">XML</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
                <Button
                  onClick={handleApiImport}
                  disabled={isProcessing || !apiConfig.endpoint || !apiConfig.apiKey}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4 mr-2" />
                      Import from API
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* External Systems Method */}
        {importMethod === 'manual' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(integrationTemplates).map(([key, integration]) => (
                <Card key={key} className="bg-slate-700/50 border-slate-600 cursor-pointer hover:border-blue-500 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{integration.name}</h4>
                      <Button
                        size="sm"
                        onClick={() => setSelectedIntegration(key)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Configure
                      </Button>
                    </div>
                    <p className="text-slate-400 text-sm mb-3">{integration.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {integration.fields.slice(0, 3).map(field => (
                        <span key={field} className="px-2 py-1 bg-slate-600 text-slate-300 rounded text-xs">
                          {field}
                        </span>
                      ))}
                      {integration.fields.length > 3 && (
                        <span className="px-2 py-1 bg-slate-600 text-slate-300 rounded text-xs">
                          +{integration.fields.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedIntegration && (
              <Card className="bg-slate-700/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white">
                    {integrationTemplates[selectedIntegration].name} Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Connection String</label>
                    <Input
                      value={integrationTemplates[selectedIntegration].endpoint}
                      className="bg-slate-700 border-slate-600 text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Authentication</label>
                    <Input
                      type="password"
                      placeholder="Enter credentials"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      // Simulate integration
                      handleApiImport();
                    }}
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Link2 className="w-4 h-4 mr-2" />
                        Connect & Import
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportModal;

