
const dashboardItems = () => {
    const localStorageData = JSON.parse(localStorage.getItem('userData'));
  
    return [
      {
        id: 1,
        number: localStorageData ? localStorageData.clients_count : 'Null',
        img: "dashboard-admin-client.png",
        title: "Total Clients",
        color:"bg-violet-100",
      },
      {
        id: 2,
        number: localStorageData ? localStorageData.employee_count : 'Null',
        img: "dashboard-admin-employees.png",
        title: "Total Employees",
        color:"bg-blue-100",
    },
      {
        id: 3,
        number: localStorageData ? localStorageData.total_reports : 'Null',
        img: "dashboard-admin-complaints.png",
        title: "Reports",
        reports :{
            processed_reports : localStorageData ? localStorageData.processed_reports : 'Null',
            pending_reports : localStorageData ? localStorageData.pending_reports : 'Null'
        },
        color:"bg-red-100",
        
      },
      {
        id: 4,
        number: "Rs.300",
        img: "dashboard-admin-payment.png",
        title: "Pending Payments",
        color:"bg-green-100",
      },
    ];
  };
  

export default dashboardItems;  