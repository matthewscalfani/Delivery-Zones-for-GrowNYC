import React, { useState, useEffect } from 'react';

// Time windows
const timeWindows = [
  { id: 1, name: '6am-9am' },
  { id: 2, name: '8am-11am' },
  { id: 3, name: '10am-1pm' }
];

// Trucks
const trucks = [
  { id: 1, name: 'Truck 1' },
  { id: 2, name: 'Truck 2' },
  { id: 3, name: 'Truck 3' },
  { id: 4, name: 'Truck 4' }
];

// COMPLETE NYC Borough Zip Code list
const boroughs = [
  { 
    name: 'Manhattan', 
    zipcodes: [
      '10001', '10002', '10003', '10004', '10005', '10006', '10007', '10008', '10009', '10010',
      '10011', '10012', '10013', '10014', '10015', '10016', '10017', '10018', '10019', '10020',
      '10021', '10022', '10023', '10024', '10025', '10026', '10027', '10028', '10029', '10030',
      '10031', '10032', '10033', '10034', '10035', '10036', '10037', '10038', '10039', '10040',
      '10041', '10043', '10044', '10045', '10046', '10047', '10048', '10055', '10060', '10065',
      '10069', '10072', '10075', '10079', '10080', '10081', '10082', '10087', '10090', '10094',
      '10095', '10096', '10098', '10099', '10103', '10104', '10105', '10106', '10107', '10108',
      '10109', '10110', '10111', '10112', '10113', '10114', '10115', '10116', '10117', '10118',
      '10119', '10120', '10121', '10122', '10123', '10124', '10125', '10126', '10128', '10129'
    ]
  },
  { 
    name: 'Brooklyn', 
    zipcodes: [
      '11201', '11202', '11203', '11204', '11205', '11206', '11207', '11208', '11209', '11210',
      '11211', '11212', '11213', '11214', '11215', '11216', '11217', '11218', '11219', '11220',
      '11221', '11222', '11223', '11224', '11225', '11226', '11228', '11229', '11230', '11231',
      '11232', '11233', '11234', '11235', '11236', '11237', '11238', '11239', '11240', '11241',
      '11242', '11243', '11244', '11245', '11247', '11249', '11251', '11252', '11256'
    ]
  },
  { 
    name: 'Bronx', 
    zipcodes: [
      '10451', '10452', '10453', '10454', '10455', '10456', '10457', '10458', '10459', '10460',
      '10461', '10462', '10463', '10464', '10465', '10466', '10467', '10468', '10469', '10470',
      '10471', '10472', '10473', '10474', '10475'
    ]
  },
  { 
    name: 'Queens', 
    zipcodes: [
      '11001', '11004', '11005', '11040', '11101', '11102', '11103',
      '11104', '11105', '11106', '11109', '11351', '11354', '11355', '11356',
      '11357', '11358', '11359', '11360', '11361', '11362', '11363', '11364', '11365', '11366',
      '11367', '11368', '11369', '11370', '11371', '11372', '11373', '11374', '11375', '11377',
      '11378', '11379', '11385', '11411', '11412', '11413', '11414', '11415', '11416', '11417', 
      '11418', '11419', '11420', '11421', '11422', '11423', '11426', '11427', '11428', '11429', 
      '11430', '11432', '11433', '11434', '11435', '11436', '11691', '11692', '11693', '11694', 
      '11697'
    ]
  }
];

// Customer data (for example purposes)
const highDensityZips = [
  '10002', '10003', '10009', '10025', '10035', '11206', '11212', '11215', '11217', 
  '11221', '11233', '11238', '10452', '10453', '10456', '10457', '10459', '10474', '11385'
];

// Initial customer counts per zipcode
const initialCustomerCounts = {
  "10456": 10, "10002": 9, "11221": 9, "10035": 8, "10474": 8,
  "11206": 7, "11212": 7, "11215": 7, "11233": 7, "10009": 6,
  "10453": 6, "10459": 6, "11217": 6, "11385": 6, "10025": 5,
  "10452": 5, "10457": 5, "11238": 5
};

// Initial zones (covering ALL zipcodes)
const initialZones = [
  // MANHATTAN ZONES
  { 
    id: 1,
    name: 'Lower Manhattan Early', 
    window: 1,
    truck: 1,
    zipcodes: ['10004', '10005', '10006', '10007', '10038', '10280'],
    color: '#17a628' 
  },
  { 
    id: 2,
    name: 'East Village Early', 
    window: 1,
    truck: 1,
    zipcodes: ['10002', '10003', '10009', '10013'],
    color: '#45b754' 
  },
  { 
    id: 3,
    name: 'Midtown East Early', 
    window: 1,
    truck: 2,
    zipcodes: ['10016', '10017', '10022', '10065', '10075'],
    color: '#1a8f2a' 
  },
  { 
    id: 4,
    name: 'Midtown West Early', 
    window: 1,
    truck: 2,
    zipcodes: ['10001', '10010', '10011', '10018', '10019', '10020', '10036'],
    color: '#58c366' 
  },
  
  // BROOKLYN ZONES
  { 
    id: 5,
    name: 'Northwest Brooklyn Early', 
    window: 1,
    truck: 3,
    zipcodes: ['11201', '11205', '11211', '11217', '11222', '11249'],
    color: '#0c6621' 
  },
  { 
    id: 6,
    name: 'Central Brooklyn Early', 
    window: 1,
    truck: 3,
    zipcodes: ['11213', '11216', '11225', '11238'],
    color: '#39a947' 
  },
  { 
    id: 7,
    name: 'Southwest Brooklyn Early', 
    window: 1,
    truck: 4,
    zipcodes: ['11204', '11218', '11219', '11220', '11223', '11228', '11232'],
    color: '#0d7826' 
  },
  
  // BRONX ZONES
  { 
    id: 8,
    name: 'South Bronx Early', 
    window: 1,
    truck: 1,
    zipcodes: ['10451', '10454', '10455', '10456'],
    color: '#13792a' 
  },
  { 
    id: 9,
    name: 'West Bronx Early', 
    window: 1,
    truck: 2,
    zipcodes: ['10452', '10453', '10457', '10458'],
    color: '#2d9e3d' 
  },
  
  // QUEENS ZONES
  { 
    id: 10,
    name: 'Northwest Queens Early', 
    window: 1,
    truck: 3,
    zipcodes: ['11101', '11102', '11103', '11104', '11105', '11106', '11109'],
    color: '#066b1d' 
  },
  
  // MID-MORNING (8-11am) ZONES - STRATEGIC CROSS-BOROUGH AND HIGH-DENSITY
  { 
    id: 11,
    name: 'Manhattan-Brooklyn Bridge', 
    window: 2,
    truck: 1,
    zipcodes: ['10002', '10038', '11201'],
    color: '#70cf7c' 
  },
  { 
    id: 12,
    name: 'East Harlem-South Bronx', 
    window: 2,
    truck: 2,
    zipcodes: ['10029', '10035', '10037', '10039', '10451', '10454', '10455', '10456'],
    color: '#003913' 
  },
  { 
    id: 13,
    name: 'Brooklyn-Queens Connection', 
    window: 2,
    truck: 3,
    zipcodes: ['11206', '11221', '11237', '11385', '11377'],
    color: '#4bbd59' 
  },
  { 
    id: 14,
    name: 'Upper Manhattan Mid', 
    window: 2,
    truck: 4,
    zipcodes: ['10026', '10027', '10030', '10031', '10032', '10033', '10034', '10040'],
    color: '#15902a' 
  },
  
  // LATE MORNING/AFTERNOON (10am-1pm) ZONES
  { 
    id: 15,
    name: 'Upper West Side Late', 
    window: 3,
    truck: 1,
    zipcodes: ['10023', '10024', '10025', '10069', '10128'],
    color: '#24953c' 
  },
  { 
    id: 16,
    name: 'Upper East Side Late', 
    window: 3,
    truck: 1,
    zipcodes: ['10021', '10028', '10044', '10128'],
    color: '#63cb71' 
  },
  { 
    id: 17,
    name: 'West Village Late', 
    window: 3,
    truck: 2,
    zipcodes: ['10012', '10014', '10008', '10041', '10043', '10045', '10046', '10047', '10048', '10055', '10060', '10072', '10079', '10080', '10081', '10082', '10087', '10090', '10094', '10095', '10096', '10098', '10099', '10103', '10104', '10105', '10106', '10107', '10108', '10109', '10110', '10111', '10112', '10113', '10114', '10115', '10116', '10117', '10118', '10119', '10120', '10121', '10122', '10123', '10124', '10125', '10126', '10129'],
    color: '#32a142' 
  },
  { 
    id: 18,
    name: 'North Brooklyn Late', 
    window: 3,
    truck: 2,
    zipcodes: ['11207', '11208', '11212', '11221', '11233', '11239', '11240', '11241', '11242', '11243', '11244', '11245', '11247', '11251', '11252'],
    color: '#56c164' 
  },
  { 
    id: 19,
    name: 'South Brooklyn Late', 
    window: 3,
    truck: 3,
    zipcodes: ['11203', '11209', '11210', '11214', '11224', '11226', '11229', '11230', '11231', '11234', '11235', '11236', '11202', '11256'],
    color: '#0e8427' 
  },
  { 
    id: 20,
    name: 'Northeast Bronx Late', 
    window: 3,
    truck: 3,
    zipcodes: ['10459', '10460', '10461', '10462', '10465', '10466', '10467', '10468', '10469', '10470', '10471', '10472', '10473', '10474', '10475'],
    color: '#0a5f1d' 
  },
  { 
    id: 21,
    name: 'Northeast Queens Late', 
    window: 3,
    truck: 4,
    zipcodes: ['11354', '11355', '11356', '11357', '11358', '11359', '11360', '11361', '11362', '11363', '11364', '11365', '11366', '11367', '11368', '11369', '11370', '11371', '11372', '11373', '11374', '11375', '11377', '11378', '11379', '11351'],
    color: '#084d18' 
  },
  { 
    id: 22,
    name: 'Southern Queens Late', 
    window: 3,
    truck: 4,
    zipcodes: ['11001', '11004', '11005', '11040', '11385', '11411', '11412', '11413', '11414', '11415', '11416', '11417', '11418', '11419', '11420', '11421', '11422', '11423', '11426', '11427', '11428', '11429', '11430', '11432', '11433', '11434', '11435', '11436', '11691', '11692', '11693', '11694', '11697'],
    color: '#28973a' 
  }
];

const DeliveryPlanner = () => {
  // State for zones - force use of initialZones as default for now
  const [zones, setZones] = useState(() => {
    // Clear any existing zones to apply our new color scheme
    localStorage.removeItem('delivery-zones');
    return initialZones;
  });
  
  // State for selected zone, active tab, etc.
  const [selectedZone, setSelectedZone] = useState(null);
  const [activeTab, setActiveTab] = useState('zones');
  const [selectedBorough, setSelectedBorough] = useState('All');
  const [searchZip, setSearchZip] = useState('');
  const [showUnassigned, setShowUnassigned] = useState(false);
  
  // State for export filter
  const [exportFilter, setExportFilter] = useState({
    borough: 'All',
    onlyAssigned: false,
    onlyUnassigned: false,
    onlyHighDensity: false
  });
  
  // State for customer data import
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');
  
  // Load customer counts from localStorage on component mount
  const [customerCountData, setCustomerCountData] = useState(() => {
    const savedCounts = localStorage.getItem('customer-counts');
    return savedCounts ? JSON.parse(savedCounts) : initialCustomerCounts;
  });
  
  // Save zones to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('delivery-zones', JSON.stringify(zones));
  }, [zones]);
  
  // Save customer counts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customer-counts', JSON.stringify(customerCountData));
  }, [customerCountData]);
  
  // Get all zipcodes
  const allZipcodes = boroughs.flatMap(borough => 
    borough.zipcodes.map(zip => ({ code: zip, borough: borough.name }))
  );
  
  // Get zone for a zipcode
  const getZoneForZipcode = (zipcode) => {
    return zones.find(zone => zone.zipcodes.includes(zipcode));
  };
  
  // Get unassigned zipcodes
  const getUnassignedZipcodes = () => {
    return allZipcodes
      .filter(zip => !zones.some(zone => zone.zipcodes.includes(zip.code)))
      .map(zip => zip.code);
  };
  
  // Get customer count for a zipcode
  const getCustomerCount = (zipcode) => {
    return customerCountData[zipcode] || 0;
  };
  
  // Check if a zipcode is high density
  const isHighDensity = (zipcode) => {
    return highDensityZips.includes(zipcode);
  };
  
  // Handle zipcode click
  const handleZipCodeClick = (zipcode) => {
    if (!selectedZone) {
      alert('Please select a zone first');
      return;
    }
    
    const existingZone = getZoneForZipcode(zipcode);
    if (existingZone && existingZone.id !== selectedZone.id) {
      if (window.confirm(`Zipcode ${zipcode} is already in zone "${existingZone.name}". Move it?`)) {
        // Remove from old zone and add to new zone
        setZones(zones.map(zone => {
          if (zone.id === existingZone.id) {
            return { ...zone, zipcodes: zone.zipcodes.filter(z => z !== zipcode) };
          }
          if (zone.id === selectedZone.id) {
            return { ...zone, zipcodes: [...zone.zipcodes, zipcode] };
          }
          return zone;
        }));
      }
      return;
    }
    
    if (existingZone && existingZone.id === selectedZone.id) {
      // Remove zipcode from zone
      setZones(zones.map(zone => 
        zone.id === selectedZone.id 
          ? { ...zone, zipcodes: zone.zipcodes.filter(z => z !== zipcode) }
          : zone
      ));
    } else {
      // Add zipcode to zone
      setZones(zones.map(zone => 
        zone.id === selectedZone.id 
          ? { ...zone, zipcodes: [...zone.zipcodes, zipcode] }
          : zone
      ));
    }
  };
  
  // Create a new zone
  const createNewZone = () => {
    const newId = Math.max(...zones.map(z => z.id)) + 1;
    const newZone = {
      id: newId,
      name: `New Zone ${newId}`,
      window: 1,
      truck: 1,
      zipcodes: [],
      color: getRandomColor()
    };
    
    setZones([...zones, newZone]);
    setSelectedZone(newZone);
  };
  
  // Generate a random color
  const getRandomColor = () => {
    // Random opacity between dark green (#003913) and bright green (#17a628)
    const baseColors = ['#003913', '#054d1a', '#0a6021', '#0f7327', '#14862d', '#17a628'];
    return baseColors[Math.floor(Math.random() * baseColors.length)];
  };
  
  // Update zone window
  const updateZoneWindow = (zoneId, windowId) => {
    setZones(zones.map(zone => 
      zone.id === zoneId 
        ? { ...zone, window: parseInt(windowId) }
        : zone
    ));
  };
  
  // Update zone truck
  const updateZoneTruck = (zoneId, truckId) => {
    setZones(zones.map(zone => 
      zone.id === zoneId 
        ? { ...zone, truck: parseInt(truckId) }
        : zone
    ));
  };
  
  // Update zone name
  const updateZoneName = (zoneId, name) => {
    setZones(zones.map(zone => 
      zone.id === zoneId 
        ? { ...zone, name }
        : zone
    ));
    
    if (selectedZone && selectedZone.id === zoneId) {
      setSelectedZone({ ...selectedZone, name });
    }
  };
  
  // Update zone color
  const updateZoneColor = (zoneId, color) => {
    setZones(zones.map(zone => 
      zone.id === zoneId 
        ? { ...zone, color }
        : zone
    ));
    
    if (selectedZone && selectedZone.id === zoneId) {
      setSelectedZone({ ...selectedZone, color });
    }
  };
  
  // Delete a zone
  const deleteZone = (zoneId) => {
    if (window.confirm('Are you sure you want to delete this zone?')) {
      setZones(zones.filter(zone => zone.id !== zoneId));
      
      if (selectedZone && selectedZone.id === zoneId) {
        setSelectedZone(null);
      }
    }
  };
  
  // Reset to default zones
  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to reset to default zones? This will remove all your changes.')) {
      setZones(initialZones);
      setSelectedZone(null);
    }
  };
  
  // Import customer counts from CSV
  const handleImportCustomerCounts = () => {
    setImportError('');
    setImportSuccess('');
    
    if (!importData.trim()) {
      setImportError('Please enter some CSV data.');
      return;
    }
    
    try {
      // Parse CSV data
      const lines = importData.trim().split('\n');
      const newCustomerCounts = { ...customerCountData };
      let updatedCount = 0;
      let skippedCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Split by comma or tab
        const parts = line.includes(',') ? line.split(',') : line.split('\t');
        if (parts.length < 2) {
          skippedCount++;
          continue;
        }
        
        const zipcode = parts[0].trim().replace(/['"]/g, ''); // Remove quotes if present
        const count = parseInt(parts[1], 10);
        
        // Validate zipcode format and count
        if (!/^\d{5}$/.test(zipcode)) {
          skippedCount++;
          continue;
        }
        
        if (isNaN(count) || count < 0) {
          skippedCount++;
          continue;
        }
        
        // Check if the zipcode exists in our data
        const exists = allZipcodes.some(z => z.code === zipcode);
        if (!exists) {
          skippedCount++;
          continue;
        }
        
        // Update count
        newCustomerCounts[zipcode] = count;
        updatedCount++;
      }
      
      // Update state
      setCustomerCountData(newCustomerCounts);
      setImportSuccess(`Successfully updated ${updatedCount} zip codes. Skipped ${skippedCount} invalid entries.`);
      setImportData('');
      
      // Close modal after a delay
      if (updatedCount > 0) {
        setTimeout(() => {
          setShowImportModal(false);
        }, 2000);
      }
    } catch (error) {
      setImportError('Error parsing CSV data. Please check the format.');
    }
  };
  
  // Filter zipcodes based on current filter settings
  const filterZipcodes = () => {
    let filteredZips = [];
    
    // Start with all or specific borough
    if (selectedBorough === 'All') {
      filteredZips = allZipcodes;
    } else {
      filteredZips = allZipcodes.filter(zip => zip.borough === selectedBorough);
    }
    
    // Apply unassigned filter if enabled
    if (showUnassigned) {
      filteredZips = filteredZips.filter(zip => !getZoneForZipcode(zip.code));
    }
    
    // Apply search filter
    if (searchZip) {
      filteredZips = filteredZips.filter(zip => zip.code.includes(searchZip));
    }
    
    return filteredZips;
  };
  
  // Function to export zone data to CSV
  const exportZoneDataToCSV = () => {
    // Prepare headers for CSV
    const headers = [
      'Zip Code',
      'Borough',
      'Zone Name',
      'Time Window',
      'Truck',
      'Customer Count',
      'High Density'
    ];
    
    // Create rows for each zipcode
    const rows = allZipcodes.map(zip => {
      const zone = getZoneForZipcode(zip.code);
      const customerCount = getCustomerCount(zip.code);
      const isHighDensityZip = isHighDensity(zip.code);
      
      return [
        zip.code,
        zip.borough,
        zone ? zone.name : 'Unassigned',
        zone ? timeWindows.find(w => w.id === zone.window)?.name : 'N/A',
        zone ? trucks.find(t => t.id === zone.truck)?.name : 'N/A',
        customerCount,
        isHighDensityZip ? 'Yes' : 'No'
      ];
    });
    
    // Convert to CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'nyc_delivery_zones.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to export filtered data (by borough, assignment status, etc.)
  const exportFilteredDataToCSV = (filter = {}) => {
    const { borough, onlyAssigned, onlyUnassigned, onlyHighDensity } = filter;
    
    // Prepare headers for CSV
    const headers = [
      'Zip Code',
      'Borough',
      'Zone Name',
      'Time Window',
      'Truck',
      'Customer Count',
      'High Density'
    ];
    
    // Filter zipcodes based on criteria
    let filteredZips = allZipcodes;
    
    if (borough && borough !== 'All') {
      filteredZips = filteredZips.filter(zip => zip.borough === borough);
    }
    
    if (onlyAssigned) {
      filteredZips = filteredZips.filter(zip => getZoneForZipcode(zip.code));
    }
    
    if (onlyUnassigned) {
      filteredZips = filteredZips.filter(zip => !getZoneForZipcode(zip.code));
    }
    
    if (onlyHighDensity) {
      filteredZips = filteredZips.filter(zip => isHighDensity(zip.code));
    }
    
    // Create rows for filtered zipcodes
    const rows = filteredZips.map(zip => {
      const zone = getZoneForZipcode(zip.code);
      const customerCount = getCustomerCount(zip.code);
      const isHighDensityZip = isHighDensity(zip.code);
      
      return [
        zip.code,
        zip.borough,
        zone ? zone.name : 'Unassigned',
        zone ? timeWindows.find(w => w.id === zone.window)?.name : 'N/A',
        zone ? trucks.find(t => t.id === zone.truck)?.name : 'N/A',
        customerCount,
        isHighDensityZip ? 'Yes' : 'No'
      ];
    });
    
    // Convert to CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create filename based on filters
    let filename = 'nyc_delivery_zones';
    if (borough && borough !== 'All') filename += `_${borough.toLowerCase()}`;
    if (onlyAssigned) filename += '_assigned';
    if (onlyUnassigned) filename += '_unassigned';
    if (onlyHighDensity) filename += '_highdensity';
    filename += '.csv';
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Export UI helpers
  const handleFilterChange = (field, value) => {
    setExportFilter({
      ...exportFilter,
      [field]: value
    });
    
    // Handle mutually exclusive filters
    if (field === 'onlyAssigned' && value) {
      setExportFilter(prev => ({
        ...prev,
        [field]: value,
        onlyUnassigned: false
      }));
    }
    
    if (field === 'onlyUnassigned' && value) {
      setExportFilter(prev => ({
        ...prev,
        [field]: value,
        onlyAssigned: false
      }));
    }
  };
  
  // Count zipcodes that match the current filter
  const countMatchingZipcodes = () => {
    let filteredZips = allZipcodes;
    
    if (exportFilter.borough !== 'All') {
      filteredZips = filteredZips.filter(zip => zip.borough === exportFilter.borough);
    }
    
    if (exportFilter.onlyAssigned) {
      filteredZips = filteredZips.filter(zip => getZoneForZipcode(zip.code));
    }
    
    if (exportFilter.onlyUnassigned) {
      filteredZips = filteredZips.filter(zip => !getZoneForZipcode(zip.code));
    }
    
    if (exportFilter.onlyHighDensity) {
      filteredZips = filteredZips.filter(zip => isHighDensity(zip.code));
    }
    
    return filteredZips.length;
  };
  
  // Calculate total customer count
  const getTotalCustomers = () => {
    return Object.values(customerCountData).reduce((sum, count) => sum + count, 0);
  };
  
  // Render zones tab
  const renderZonesTab = () => (
    <div className="flex h-full">
      <div className="w-1/3 p-4 bg-white rounded shadow mr-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Delivery Zones</h2>
          <div className="flex">
                          <button
                className="bg-green-800 text-white px-3 py-1 rounded text-sm mr-2"
                onClick={createNewZone}
              >
                New Zone
              </button>
              <button 
                className="bg-black text-white px-3 py-1 rounded text-sm"
                onClick={resetToDefault}
              >
                Reset
              </button>
          </div>
        </div>
        
        {zones.map(zone => (
          <div 
            key={zone.id}
            className={`p-3 mb-2 border rounded cursor-pointer ${
              selectedZone && selectedZone.id === zone.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300'
            }`}
            onClick={() => setSelectedZone(zone)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: zone.color }}
                ></div>
                <span className="font-medium">{zone.name}</span>
              </div>
              <span className="text-xs text-gray-500">{zone.zipcodes.length} zips</span>
            </div>
            
            {selectedZone && selectedZone.id === zone.id && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Zone Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={zone.name}
                    onChange={(e) => updateZoneName(zone.id, e.target.value)}
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Time Window:</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded"
                    value={zone.window}
                    onChange={(e) => updateZoneWindow(zone.id, e.target.value)}
                  >
                    {timeWindows.map(window => (
                      <option key={window.id} value={window.id}>{window.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Truck:</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded"
                    value={zone.truck}
                    onChange={(e) => updateZoneTruck(zone.id, e.target.value)}
                  >
                    {trucks.map(truck => (
                      <option key={truck.id} value={truck.id}>{truck.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Color:</label>
                  <input
                    type="color"
                    className="w-full p-1 border border-gray-300 rounded"
                    value={zone.color}
                    onChange={(e) => updateZoneColor(zone.id, e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Zipcodes ({zone.zipcodes.length}):
                  </label>
                  <div className="text-sm bg-gray-100 p-2 rounded max-h-32 overflow-y-auto">
                    {zone.zipcodes.length > 0 
                      ? zone.zipcodes.sort().join(', ')
                      : 'No zipcodes assigned'}
                  </div>
                </div>
                
                <button
                  className="w-full mt-2 bg-black bg-opacity-10 text-black py-1 rounded hover:bg-opacity-20"
                  onClick={() => deleteZone(zone.id)}
                >
                  Delete Zone
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex-1 bg-white rounded shadow p-4 overflow-hidden flex flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Zipcodes</h2>
          <div className="flex mb-2">
            <select
              className="p-2 border border-gray-300 rounded mr-2"
              value={selectedBorough}
              onChange={(e) => setSelectedBorough(e.target.value)}
            >
              <option value="All">All Boroughs</option>
              <option value="Manhattan">Manhattan</option>
              <option value="Brooklyn">Brooklyn</option>
              <option value="Bronx">Bronx</option>
              <option value="Queens">Queens</option>
            </select>
            
            <input
              type="text"
              placeholder="Search zip code..."
              className="p-2 border border-gray-300 rounded mr-2 flex-grow"
              value={searchZip}
              onChange={(e) => setSearchZip(e.target.value)}
            />
            
            <div className="flex items-center ml-2">
              <input
                type="checkbox"
                id="showUnassigned"
                className="mr-2"
                checked={showUnassigned}
                onChange={() => setShowUnassigned(!showUnassigned)}
              />
              <label htmlFor="showUnassigned" className="text-sm">
                Unassigned ({getUnassignedZipcodes().length})
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-4 gap-3">
            {filterZipcodes().map(zip => {
              const zone = getZoneForZipcode(zip.code);
              const isHigh = isHighDensity(zip.code);
              
              return (
                <div
                  key={zip.code}
                  className={`p-2 rounded cursor-pointer text-center ${
                    zone 
                      ? 'text-white' 
                      : isHigh
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  style={zone ? { backgroundColor: zone.color } : {}}
                  onClick={() => handleZipCodeClick(zip.code)}
                >
                  <div className="font-medium">{zip.code}</div>
                  <div className="text-xs">{zip.borough}</div>
                  {getCustomerCount(zip.code) > 0 && (
                    <div className="text-xs font-bold">
                      {getCustomerCount(zip.code)} customers
                    </div>
                  )}
                  {isHigh && !zone && <div className="text-xs font-bold">High density</div>}
                  {zone && (
                    <div className="text-xs mt-1 font-bold">{zone.name}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render trucks tab
  const renderTrucksTab = () => {
    // Group zones by truck
    const truckAssignments = {};
    
    trucks.forEach(truck => {
      truckAssignments[truck.id] = {
        name: truck.name,
        zones: []
      };
    });
    
    zones.forEach(zone => {
      if (truckAssignments[zone.truck]) {
        truckAssignments[zone.truck].zones.push(zone);
      }
    });
    
    return (
      <div className="grid grid-cols-2 gap-4">
        {trucks.map(truck => {
          const assignment = truckAssignments[truck.id];
          const totalZips = assignment.zones.reduce((sum, zone) => sum + zone.zipcodes.length, 0);
          
          // Count unique boroughs covered by this truck
          const boroughsCovered = new Set();
          assignment.zones.forEach(zone => {
            zone.zipcodes.forEach(zip => {
              const borough = allZipcodes.find(z => z.code === zip)?.borough;
              if (borough) boroughsCovered.add(borough);
            });
          });
          
          return (
            <div key={truck.id} className="bg-white rounded shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold">{truck.name}</h2>
                <div className="text-sm text-gray-600">
                  {totalZips} total zipcodes
                </div>
              </div>
              
              <div className="mb-2">
                <div className="text-sm text-gray-600">
                  Boroughs: {Array.from(boroughsCovered).join(', ')}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Schedule:</h3>
                <div className="grid grid-cols-3 bg-gray-100 rounded p-2">
                  <div className="p-2 border-r border-gray-300">
                    <div className="font-medium mb-1">6am-9am</div>
                    {assignment.zones
                      .filter(zone => zone.window === 1)
                      .map(zone => (
                        <div 
                          key={zone.id} 
                          className="text-sm mb-1 p-1 rounded text-white"
                          style={{ backgroundColor: zone.color }}
                        >
                          {zone.name} ({zone.zipcodes.length})
                        </div>
                      ))
                    }
                    {assignment.zones.filter(zone => zone.window === 1).length === 0 && (
                      <div className="text-sm text-gray-500 italic">No zones</div>
                    )}
                  </div>
                  
                  <div className="p-2 border-r border-gray-300">
                    <div className="font-medium mb-1">8am-11am</div>
                    {assignment.zones
                      .filter(zone => zone.window === 2)
                      .map(zone => (
                        <div 
                          key={zone.id} 
                          className="text-sm mb-1 p-1 rounded text-white"
                          style={{ backgroundColor: zone.color }}
                        >
                          {zone.name} ({zone.zipcodes.length})
                        </div>
                      ))
                    }
                    {assignment.zones.filter(zone => zone.window === 2).length === 0 && (
                      <div className="text-sm text-gray-500 italic">No zones</div>
                    )}
                  </div>
                  
                  <div className="p-2">
                    <div className="font-medium mb-1">10am-1pm</div>
                    {assignment.zones
                      .filter(zone => zone.window === 3)
                      .map(zone => (
                        <div 
                          key={zone.id} 
                          className="text-sm mb-1 p-1 rounded text-white"
                          style={{ backgroundColor: zone.color }}
                        >
                          {zone.name} ({zone.zipcodes.length})
                        </div>
                      ))
                    }
                    {assignment.zones.filter(zone => zone.window === 3).length === 0 && (
                      <div className="text-sm text-gray-500 italic">No zones</div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">All Assigned Zones:</h3>
                <div className="grid grid-cols-1 gap-2">
                  {assignment.zones.map(zone => (
                    <div 
                      key={zone.id} 
                      className="p-2 rounded"
                      style={{ backgroundColor: zone.color }}
                    >
                      <div className="flex justify-between text-white">
                        <span className="font-medium">{zone.name}</span>
                        <span>{timeWindows.find(w => w.id === zone.window)?.name}</span>
                      </div>
                      <div className="text-white text-sm">
                        {zone.zipcodes.length} zipcodes
                      </div>
                    </div>
                  ))}
                  
                  {assignment.zones.length === 0 && (
                    <div className="text-gray-500 italic">No zones assigned</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render windows tab
  const renderWindowsTab = () => {
    // Group zones by window
    const windowAssignments = {};
    
    timeWindows.forEach(window => {
      windowAssignments[window.id] = {
        name: window.name,
        zones: []
      };
    });
    
    zones.forEach(zone => {
      if (windowAssignments[zone.window]) {
        windowAssignments[zone.window].zones.push(zone);
      }
    });
    
    return (
      <div className="grid grid-cols-1 gap-4">
        {timeWindows.map(window => {
          const assignment = windowAssignments[window.id];
          const totalZips = assignment.zones.reduce((sum, zone) => sum + zone.zipcodes.length, 0);
          
          return (
            <div key={window.id} className="bg-white rounded shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold">{window.name}</h2>
                <div className="text-sm text-gray-600">
                  {totalZips} total zipcodes in {assignment.zones.length} zones
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                {assignment.zones.map(zone => (
                  <div 
                    key={zone.id} 
                    className="p-3 rounded"
                    style={{ backgroundColor: zone.color }}
                  >
                    <div className="text-white font-medium mb-1">{zone.name}</div>
                    <div className="text-white text-sm">Truck: {trucks.find(t => t.id === zone.truck)?.name}</div>
                    <div className="text-white text-sm">
                      {zone.zipcodes.length} zipcodes
                    </div>
                  </div>
                ))}
                
                {assignment.zones.length === 0 && (
                  <div className="col-span-3 text-gray-500 italic p-3 bg-gray-100 rounded">
                    No zones assigned to this time window
                  </div>
                )}
              </div>
              
              {window.id === 2 && (
                <div className="mt-4 bg-blue-50 p-3 rounded border border-blue-200">
                  <h3 className="font-medium mb-2">8am-11am Strategy Notes</h3>
                  <p className="text-sm">
                    This overlapping window provides strategic flexibility between morning and afternoon deliveries:
                  </p>
                  <ul className="text-sm list-disc pl-5 mt-1">
                    <li>Covers cross-borough boundaries where trucks need more flexibility</li>
                    <li>Ideal for high-density areas with many customers</li>
                    <li>Helps with the transition between early morning and afternoon routes</li>
                    <li>Provides buffer time for trucks that need to travel between distant zones</li>
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render overview tab
  const renderOverviewTab = () => {
    const unassignedZipcodes = getUnassignedZipcodes();
    const totalZips = allZipcodes.length;
    const assignedZips = totalZips - unassignedZipcodes.length;
    const coverage = Math.round((assignedZips / totalZips) * 100);
    
    // Calculate total customer count
    const totalCustomers = getTotalCustomers();
    
    // Borough stats
    const boroughStats = {};
    boroughs.forEach(borough => {
      const total = borough.zipcodes.length;
      const unassigned = borough.zipcodes.filter(zip => !getZoneForZipcode(zip)).length;
      const assigned = total - unassigned;
      const coveragePercent = Math.round((assigned / total) * 100);
      
      boroughStats[borough.name] = {
        total,
        assigned,
        unassigned,
        coverage: coveragePercent
      };
    });
    
    // Time window stats
    const windowStats = {};
    timeWindows.forEach(window => {
      const windowZones = zones.filter(zone => zone.window === window.id);
      const zipSet = new Set();
      windowZones.forEach(zone => {
        zone.zipcodes.forEach(zip => zipSet.add(zip));
      });
      
      windowStats[window.id] = {
        name: window.name,
        zones: windowZones.length,
        zipcodes: zipSet.size
      };
    });
    
    return (
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-bold mb-4">Coverage Overview</h2>
          
          <div className="bg-blue-50 p-3 rounded mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium">Total Coverage:</span>
              <span>{assignedZips} of {totalZips} zipcodes ({coverage}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${coverage}%` }}></div>
            </div>
          </div>
          
          <h3 className="font-medium mb-2">Coverage by Borough</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Object.entries(boroughStats).map(([borough, stats]) => (
              <div key={borough} className="bg-gray-50 p-3 rounded">
                <h4 className="font-medium mb-2">{borough}</h4>
                
                <div className="flex justify-between mb-1 text-sm">
                  <span>Total Zipcodes:</span>
                  <span>{stats.total}</span>
                </div>
                
                <div className="flex justify-between mb-1 text-sm">
                  <span>Assigned:</span>
                  <span className="text-green-600">{stats.assigned}</span>
                </div>
                
                <div className="flex justify-between mb-1 text-sm">
                  <span>Unassigned:</span>
                  <span className="text-red-600">{stats.unassigned}</span>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Coverage:</span>
                    <span>{stats.coverage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${stats.coverage}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <h3 className="font-medium mb-2">Coverage by Time Window</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {Object.entries(windowStats).map(([id, stats]) => (
              <div key={id} className="bg-gray-50 p-3 rounded">
                <h4 className="font-medium mb-2">{stats.name}</h4>
                
                <div className="flex justify-between mb-1 text-sm">
                  <span>Zones:</span>
                  <span>{stats.zones}</span>
                </div>
                
                <div className="flex justify-between mb-1 text-sm">
                  <span>Zipcodes:</span>
                  <span>{stats.zipcodes}</span>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Coverage:</span>
                    <span>{Math.round((stats.zipcodes / totalZips) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.zipcodes / totalZips) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {unassignedZipcodes.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2 text-red-600">Unassigned Zipcodes ({unassignedZipcodes.length})</h3>
              <div className="bg-red-50 p-3 rounded text-sm">
                {unassignedZipcodes.sort().join(', ')}
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-bold mb-3">Customer Data</h2>
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-xl font-bold">{totalCustomers}</span>
              <span className="text-sm text-gray-600 ml-2">Total Customers</span>
            </div>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              onClick={() => setShowImportModal(true)}
            >
              Import Customer Counts
            </button>
          </div>
          
          <div className="bg-blue-50 p-3 rounded border border-blue-200 mb-4">
            <h3 className="font-medium mb-2">Top 5 ZIP Codes by Customer Count</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(customerCountData)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([zipcode, count]) => {
                  const borough = allZipcodes.find(z => z.code === zipcode)?.borough || 'Unknown';
                  
                  return (
                    <div key={zipcode} className="flex justify-between items-center p-2 bg-white rounded">
                      <div>
                        <span className="font-bold">{zipcode}</span>
                        <span className="text-xs text-gray-600 ml-2">{borough}</span>
                      </div>
                      <div>
                        <span className="font-bold text-green-700">{count}</span>
                        <span className="text-xs ml-1">customers</span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          
          <h2 className="text-lg font-bold mb-3">Data Persistence</h2>
          <div className="bg-green-50 p-3 rounded border border-green-200">
            <p className="text-sm">
              <strong>Your changes are automatically saved</strong> to your browser's local storage. 
              They will persist even if you close the browser or refresh the page.
            </p>
            <p className="text-sm mt-2">
              If you need to start fresh, use the <strong>Reset</strong> button in the zone management tab.
            </p>
            <p className="text-sm mt-2">
              <strong>Customer count data</strong> is also saved automatically and can be updated using the Import button above.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  // Render export tab
  const renderExportTab = () => {
    return (
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-bold mb-4">Export Delivery Zone Data</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Quick Export</h3>
              <button
                className="bg-green-700 text-white px-4 py-2 rounded mb-2 w-full"
                onClick={exportZoneDataToCSV}
              >
                Export All Zip Codes
              </button>
              
              <div className="mt-4 bg-gray-100 p-3 rounded text-sm">
                <p>The export will include the following information for each zip code:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Zip code and borough</li>
                  <li>Assigned zone name</li>
                  <li>Time window (6am-9am, 8am-11am, or 10am-1pm)</li>
                  <li>Assigned truck</li>
                  <li>Customer count</li>
                  <li>High density flag</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Custom Export</h3>
              
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Borough:</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={exportFilter.borough}
                  onChange={(e) => handleFilterChange('borough', e.target.value)}
                >
                  <option value="All">All Boroughs</option>
                  <option value="Manhattan">Manhattan</option>
                  <option value="Brooklyn">Brooklyn</option>
                  <option value="Bronx">Bronx</option>
                  <option value="Queens">Queens</option>
                </select>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="onlyAssigned"
                    className="mr-2"
                    checked={exportFilter.onlyAssigned}
                    onChange={(e) => handleFilterChange('onlyAssigned', e.target.checked)}
                  />
                  <label htmlFor="onlyAssigned" className="text-sm">Only assigned zip codes</label>
                </div>
                
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="onlyUnassigned"
                    className="mr-2"
                    checked={exportFilter.onlyUnassigned}
                    onChange={(e) => handleFilterChange('onlyUnassigned', e.target.checked)}
                  />
                  <label htmlFor="onlyUnassigned" className="text-sm">Only unassigned zip codes</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="onlyHighDensity"
                    className="mr-2"
                    checked={exportFilter.onlyHighDensity}
                    onChange={(e) => handleFilterChange('onlyHighDensity', e.target.checked)}
                  />
                  <label htmlFor="onlyHighDensity" className="text-sm">Only high-density zip codes</label>
                </div>
              </div>
              
              <div className="bg-green-50 p-2 rounded mb-3 text-sm">
                <strong>{countMatchingZipcodes()}</strong> zip codes match these filters
              </div>
              
              <button
                className="bg-green-900 text-white px-4 py-2 rounded w-full"
                onClick={() => exportFilteredDataToCSV(exportFilter)}
              >
                Export Filtered Data
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-bold mb-3">Export Summary</h2>
          
          <div className="grid grid-cols-4 gap-4 mb-4 text-center">
            <div className="bg-gray-100 p-3 rounded">
              <div className="text-xl font-bold">{allZipcodes.length}</div>
              <div className="text-sm text-gray-600">Total Zip Codes</div>
            </div>
            
            <div className="bg-gray-100 p-3 rounded">
              <div className="text-xl font-bold">{allZipcodes.filter(zip => getZoneForZipcode(zip.code)).length}</div>
              <div className="text-sm text-gray-600">Assigned</div>
            </div>
            
            <div className="bg-gray-100 p-3 rounded">
              <div className="text-xl font-bold">{allZipcodes.filter(zip => !getZoneForZipcode(zip.code)).length}</div>
              <div className="text-sm text-gray-600">Unassigned</div>
            </div>
            
            <div className="bg-gray-100 p-3 rounded">
              <div className="text-xl font-bold">{highDensityZips.length}</div>
              <div className="text-sm text-gray-600">High Density</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
            <h3 className="font-medium mb-2">CSV Compatibility Notes</h3>
            <p className="text-sm">
              The exported CSV file can be imported into most spreadsheet applications and delivery management systems. 
              You can use it for route planning, dispatch operations, or integration with your ERP system.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-green-900 text-white p-4">
        <h1 className="text-2xl font-bold">NYC Delivery Zone Planner</h1>
        <div className="text-sm flex justify-between">
          <span>Complete coverage of all NYC zip codes with 6am-9am, 8am-11am, and 10am-1pm windows</span>
          <span className="bg-green-800 text-white px-2 py-1 rounded text-xs">Auto-Save Enabled</span>
        </div>
      </div>
      
      <div className="flex border-b border-gray-300 bg-white">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'zones' ? 'text-green-800 border-b-2 border-green-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('zones')}
        >
          Zone Management
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'trucks' ? 'text-green-800 border-b-2 border-green-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('trucks')}
        >
          Truck Assignments
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'windows' ? 'text-green-800 border-b-2 border-green-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('windows')}
        >
          Time Windows
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-green-800 border-b-2 border-green-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('overview')}
        >
          Coverage Overview
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'export' ? 'text-green-800 border-b-2 border-green-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('export')}
        >
          Export Data
        </button>
      </div>
      
      <div className="flex-grow p-4 overflow-auto">
        {activeTab === 'zones' && renderZonesTab()}
        {activeTab === 'trucks' && renderTrucksTab()}
        {activeTab === 'windows' && renderWindowsTab()}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'export' && renderExportTab()}
      </div>
      
      {/* Customer Count Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 w-2/3 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Import Customer Counts by ZIP Code</h2>
            
            <p className="text-sm text-gray-600 mb-4">
              Paste your ZIP code and customer count data below. Each line should contain a ZIP code and customer count, separated by a comma or tab.
              <br />
              Example: <code>10001,15</code> or <code>10001  15</code>
            </p>
            
            <textarea
              className="w-full h-48 p-2 border border-gray-300 rounded mb-4 font-mono text-sm"
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="10001,15&#10;10002,8&#10;10003,12"
            ></textarea>
            
            {importError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                {importError}
              </div>
            )}
            
            {importSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
                {importSuccess}
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                className="bg-black text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowImportModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-800 text-white px-4 py-2 rounded"
                onClick={handleImportCustomerCounts}
              >
                Import Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPlanner;