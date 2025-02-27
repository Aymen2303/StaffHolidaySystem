import { supabase } from "./SupabaseClient";

const fetchEmployeesWithDetails = async () => {
    try {
        console.log("Fetching employees...");

        // Fetch Employees
        const { data: employees, error: employeesError } = await supabase
            .from("employees")
            .select("*");

        if (employeesError) {
            console.error("Error fetching employees:", employeesError);
            throw employeesError;
        }

        console.log("Employees fetched successfully:", employees);

        // Fetch Services
        console.log("Fetching services...");
        const { data: services, error: servicesError } = await supabase
            .from("services")
            .select("*");

        if (servicesError) {
            console.error("Error fetching services:", servicesError);
            throw servicesError;
        }

        console.log("Services fetched successfully:", services);

        // Fetch Grades
        console.log("Fetching grades...");
        const { data: grades, error: gradesError } = await supabase
            .from("grades")
            .select("*");

        if (gradesError) {
            console.error("Error fetching grades:", gradesError);
            throw gradesError;
        }

        console.log("Grades fetched successfully:", grades);

        // Fetch Vacation Data
        console.log("Fetching vacations...");
        const { data: vacations, error: vacationsError } = await supabase
            .from("vacations")
            .select("*");

        if (vacationsError) {
            console.error("Error fetching vacations:", vacationsError);
            throw vacationsError;
        }

        console.log("Vacations fetched successfully:", vacations);

        // Combine the data
        console.log("Combining employee, service, grade, and vacation data...");
        const employeesWithDetails = employees.map((employee) => {
            const service = services.find((s) => s.service_id === employee.service_id);
            const grade = grades.find((g) => g.grade_id === employee.grade_id);
            const vacation = vacations.find((v) => v.employee_id === employee.employee_id);

            console.log(`Processing employee ${employee.employee_id}:`, {
                employee,
                service,
                grade,
                vacation,
            });

            return {
                ...employee,
                Services: service ? { service_name: service.service_name } : null,
                Grades: grade ? { grade_name: grade.grade_name } : null,
                Vacation: vacation
                    ? {
                          nature_conge: vacation.nature_conge || "N/A",
                          date_debut: vacation.date_debut || "N/A",
                          date_fin: vacation.date_fin || "N/A",
                          duree_conge: vacation.duree_conge || "N/A",
                          observation_status: vacation.observation_status || "N/A",
                      }
                    : null,
            };
        });

        console.log("Combined data:", employeesWithDetails);
        return employeesWithDetails;
    } catch (err) {
        console.error("Error in fetchEmployeesWithDetails:", err);
        return null;
    }
};

export default fetchEmployeesWithDetails;
