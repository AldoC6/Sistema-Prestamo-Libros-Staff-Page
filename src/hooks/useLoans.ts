import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface LoanRow {
    id_prestamo: number;
    fecha_inicio: string;
    fecha_devolucion: string;
    is_disabled: boolean;
    Libros: {
        titulo: string;
    } | null;
    Usuarios: {
        first_name: string;
        last_name: string;
    } | null;
    Estados: {
        estado: string;
    } | null;
}

export function useLoans() {
    const [loans, setLoans] = useState<LoanRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchLoans() {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("Prestamos")
            .select(`
        id_prestamo,
        fecha_inicio,
        fecha_devolucion,
        is_disabled,
        Libros:libro_id (
          titulo
        ),
        Usuarios:estudiante_id (
          first_name,
          last_name
        ),
        Estados:estado_id (
          estado
        )
      `)
            .order("fecha_inicio", { ascending: false });

        if (error) {
            console.error(error);
            setError(error.message);
        } else {
            setLoans(data as unknown as LoanRow[]);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchLoans();
    }, []);

    return { loans, loading, error };
}
