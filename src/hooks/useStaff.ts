import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface StaffRow {
    id_user: string;
    first_name: string;
    last_name: string;
    email: string;
    matricula: number;
    role_id: number;
    added_at: string;
    Roles?: {
        role: string;
    } | null;
}

export function useStaff() {
    const [staff, setStaff] = useState<StaffRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchStaff() {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("Usuarios")
            .select(`
        id_user,
        first_name,
        last_name,
        email,
        matricula,
        role_id,
        added_at,
        Roles:role_id (
          role
        )
      `)
            .order("added_at", { ascending: false });

        if (error) {
            console.error(error);
            setError(error.message);
        } else {
            setStaff(data as unknown as StaffRow[]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchStaff();
    }, []);

    return { staff, loading, error, reload: fetchStaff };
}
