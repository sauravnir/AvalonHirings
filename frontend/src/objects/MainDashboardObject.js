const localStorageData = JSON.parse(localStorage.getItem('userData'));

const dashboardItems = [
    {
        id: 1,
        number: localStorageData ? localStorageData.clients_count : 'Null',
        img: "dashboard-admin-client.png",
        title: "Total Clients",
    },
    {
        id: 2,
        number: localStorageData ? localStorageData.employee_count : 'Null',
        img: "dashboard-admin-employees.png",
        title: "Total Employees",
    },
    {
        id: 3,
        number: localStorageData ? localStorageData.total_reports : 'Null',
        img: "dashboard-admin-complaints.png",
        title: "Reports",
    },
    {
        id: 4,
        number: localStorageData ? localStorageData.pending_payment : 'Null',
        img: "dashboard-admin-payment.png",
        title: "Pending Payments",
    },
];

export default dashboardItems;  