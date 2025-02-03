import { supabase } from './SupabaseClient';

const fetchEmployeesWithDetails = async () => {
    try {
        console.log('Fetching employees...');

        // Step 1: Fetch Employees
        const { data: employees, error: employeesError } = await supabase
            .from('employees')
            .select('*');

        if (employeesError) {
            console.error('Error fetching employees:', employeesError);
            throw employeesError;
        }

        console.log('Employees fetched successfully:', employees);

        // Step 2: Fetch Services
        console.log('Fetching services...');
        const { data: services, error: servicesError } = await supabase
            .from('services')
            .select('*');

        if (servicesError) {
            console.error('Error fetching services:', servicesError);
            throw servicesError;
        }

        console.log('Services fetched successfully:', services);

        // Step 3: Fetch Grades
        console.log('Fetching grades...');
        const { data: grades, error: gradesError } = await supabase
            .from('grades')
            .select('*');

        if (gradesError) {
            console.error('Error fetching grades:', gradesError);
            throw gradesError;
        }

        console.log('Grades fetched successfully:', grades);

        // Step 4: Combine the data
        console.log('Combining employee, service, and grade data...');
        const employeesWithDetails = employees.map(employee => {
            const service = services.find(s => s.service_id === employee.service_id);
            const grade = grades.find(g => g.grade_id === employee.grade_id);

            console.log(`Processing employee ${employee.employee_id}:`, {
                employee,
                service,
                grade,
            });

            return {
                ...employee,
                Services: service ? { service_name: service.service_name } : null,
                Grades: grade ? { grade_name: grade.grade_name } : null,
            };
        });

        console.log('Combined data:', employeesWithDetails);
        return employeesWithDetails;
    } catch (err) {
        console.error('Error in fetchEmployeesWithDetails:', err);
        return null;
    }
};

export default fetchEmployeesWithDetails;