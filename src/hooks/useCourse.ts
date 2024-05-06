// // hooks/usarCursos.ts
// import { useState, useEffect } from 'react';
// import { buscarCursos } from '../services/courseService';
// import { CourseForm } from '../types/courseTypes';


// export const usarCursos = () => {
//   const [courses, setCourses] = useState<CourseForm[]>([]);
//   const [filteredCourses, setFilteredCourses] = useState<CourseForm[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       try {
//         const fetchedCourses = await buscarCursos();
//         setCourses(fetchedCourses);
//         setFilteredCourses(fetchedCourses);
//       } catch (error) {
//         console.error('Failed to fetch courses:', error);
//       }
//       setLoading(false);
//     };
//     fetchCourses();
//   }, []);

//   const handleSearchChange = (searchTerm: string) => {
//     const filtered = courses.filter(course => course.descricao.toLowerCase().includes(searchTerm.toLowerCase()));
//     setFilteredCourses(filtered);
//   };

//   return {
//     courses,
//     filteredCourses,
//     loading,
//     handleSearchChange
//   };
// };
