'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, User, Calculator, CalendarHeart } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale/es';

registerLocale('es', es);

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);

  let age: { years: number; months: number; days: number } | null = null;
  let error: string | null = null;

  if (birthDate && appointmentDate) {
    // Check if the date is valid. DatePicker ensures this for us mostly, but good to check:
    const bDate = new Date(birthDate);
    const aDate = new Date(appointmentDate);

    bDate.setHours(0, 0, 0, 0);
    aDate.setHours(0, 0, 0, 0);

    if (bDate > aDate) {
      error = 'La fecha de nacimiento no puede ser posterior a la fecha de la cita.';
    } else {
      let years = aDate.getFullYear() - bDate.getFullYear();
      let months = aDate.getMonth() - bDate.getMonth();
      let days = aDate.getDate() - bDate.getDate();

      if (days < 0) {
        months--;
        const previousMonth = new Date(aDate.getFullYear(), aDate.getMonth(), 0);
        days += previousMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      age = { years, months, days };
    }
  }

  // Calculate year range for the dropdown
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 130;
  const endYear = currentYear + 10;
  // create an array of years from startYear to endYear
  const yearsArray = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-white to-[#EBE9FE] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
      
      {/* Background Decorations (Fuera de la card) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Abstract Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] rounded-full bg-[#A78BFA] mix-blend-multiply filter blur-[100px] opacity-20 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] min-w-[350px] min-h-[350px] rounded-full bg-[#5B3DF5] mix-blend-multiply filter blur-[120px] opacity-10 animate-[pulse_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[20%] right-[5%] w-[25vw] h-[25vw] min-w-[200px] min-h-[200px] rounded-full bg-purple-300 mix-blend-multiply filter blur-[80px] opacity-[0.15]" />

        {/* Dotted Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#A78BFA_1.5px,transparent_1.5px)] [background-size:30px_30px] opacity-10"></div>

        {/* Floating Glassmorphism Geometric Shapes */}
        <motion.div 
          animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[8%] w-32 h-32 rounded-full border-[1px] border-[#5B3DF5]/20 bg-gradient-to-tr from-white/60 to-white/20 backdrop-blur-md shadow-[0_8px_32px_rgba(91,61,245,0.05)] hidden sm:block" 
        />
        
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, 15, 0] }} 
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[6%] w-24 h-24 rounded-full bg-gradient-to-bl from-[#A78BFA]/30 to-transparent backdrop-blur-sm hidden sm:block" 
        />

        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, -45, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[25%] right-[10%] w-16 h-16 rounded-[2rem] border-2 border-[#A78BFA]/30 bg-white/30 backdrop-blur-md hidden lg:block shadow-[0_4px_20px_rgba(167,139,250,0.1)]" 
        />

        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] right-[15%] w-8 h-8 rounded-full bg-[#5B3DF5] blur-[1px] hidden md:block" 
        />
        
        {/* Soft layout curves */}
        <div className="absolute top-0 right-[25%] w-64 h-32 bg-gradient-to-b from-[#A78BFA]/10 to-transparent rounded-b-[100px] hidden sm:block"></div>
        <div className="absolute bottom-0 left-[20%] w-80 h-40 bg-gradient-to-t from-[#5B3DF5]/5 to-transparent rounded-t-[150px] hidden sm:block"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-xl shadow-[#5B3DF5]/10 border border-slate-100 flex flex-col relative z-10"
      >
        <div className="bg-indigo-600 p-8 text-center rounded-t-3xl border-b border-indigo-700 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-4 backdrop-blur-sm shadow-inner border border-white/20">
              <Calculator className="w-8 h-8 drop-shadow-md" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-sm">Calculadora de Edad</h1>
            <p className="text-indigo-100 text-sm font-medium drop-shadow-sm">Calcula el tiempo exacto entre dos fechas</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-6">
            
            {/* Birth Date Input - Using react-datepicker */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-slate-700">
                <User className="w-4 h-4 mr-2 text-indigo-500" />
                Fecha de Nacimiento
              </label>
              <div className="relative">
                <DatePicker
                  selected={birthDate}
                  onChange={(date: Date | null) => setBirthDate(date)}
                  locale="es"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={140}
                  scrollableYearDropdown
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700 font-medium"
                  placeholderText="dd/mm/aaaa"
                  maxDate={appointmentDate || new Date()}
                />
                <CalendarHeart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
              </div>
            </div>

            {/* Appointment Date Input - Using react-datepicker */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-slate-700">
                <CalendarDays className="w-4 h-4 mr-2 text-indigo-500" />
                Fecha de la Cita
              </label>
              <div className="relative">
                <DatePicker
                  selected={appointmentDate}
                  onChange={(date: Date | null) => setAppointmentDate(date)}
                  locale="es"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={140}
                  scrollableYearDropdown
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700 font-medium"
                  placeholderText="dd/mm/aaaa"
                />
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
              </div>
            </div>

          </div>

          {/* Results Section */}
          <div className="pt-6 border-t border-slate-100">
            {error ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm font-medium border border-red-100"
              >
                {error}
              </motion.div>
            ) : age ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="bg-indigo-50 p-4 rounded-2xl text-center border border-indigo-100 transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="text-4xl font-black text-indigo-600 mb-1 drop-shadow-sm">{age.years}</div>
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Años</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-2xl text-center border border-indigo-100 transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="text-4xl font-black text-indigo-600 mb-1 drop-shadow-sm">{age.months}</div>
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Meses</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-2xl text-center border border-indigo-100 transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="text-4xl font-black text-indigo-600 mb-1 drop-shadow-sm">{age.days}</div>
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Días</div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                <p className="text-slate-400 text-sm font-medium">
                  Selecciona ambas fechas para ver el resultado
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Attribution */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 text-center rounded-b-3xl">
          <p className="text-xs text-slate-500">
            Desarrollado por <span className="font-bold text-indigo-600 uppercase tracking-wide">Ing. Andrés Durango</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
