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
  
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(new Date());

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative">
      
      {/* Logo en la esquina superior izquierda */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-lg shadow-indigo-100/50 flex items-center justify-center border border-slate-100 transition-transform hover:scale-105"
        >
          <img src="/logo.png" alt="logo" className="h-12 sm:h-16 object-contain" />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col relative"
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
