import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface BookRow {
    id_libro: number;
    titulo: string;
    ISBN: string;
    fecha_publicacion: string;
    Autores: {
        first_name: string;
        last_name: string;
    } | null;
    Generos: {
        genero: string;
    } | null;
    Images: {
        url: string;
    }[]; // puede haber más de una imagen, aunque ahora solo usamos una
}


export function useBooks() {
    const [books, setBooks] = useState<BookRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchBooks() {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("Libros")
            .select(`
    id_libro,
    titulo,
    ISBN,
    fecha_publicacion,
    Autores:autor_id (
      first_name,
      last_name
    ),
    Generos:genero_id (
      genero
    ),
    Images:Images(url)
  `)
            .order("added_at", { ascending: false });

        if (error) {
            console.error(error);
            setError(error.message);
        } else {
            setBooks(data as unknown as BookRow[]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return { books, loading, error };
}
