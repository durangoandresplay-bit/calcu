'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, User, Clock, CalendarHeart } from 'lucide-react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>('');
  
  // Set today's date as default for appointment date
  const [appointmentDate, setAppointmentDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  let age: { years: number; months: number; days: number } | null = null;
  let error: string | null = null;

  if (birthDate && appointmentDate) {
    const bDate = new Date(birthDate);
    const aDate = new Date(appointmentDate);

    // Reset time to midnight for accurate day calculation
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
        // Get the number of days in the previous month
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

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
      >
        <div className="bg-indigo-600 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-4 backdrop-blur-sm">
            <Clock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Calculadora de Edad</h1>
          <p className="text-indigo-100 text-sm font-medium">Calcula el tiempo exacto entre dos fechas</p>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-6">
            {/* Birth Date Input */}
            <div className="space-y-2">
              <label htmlFor="birthDate" className="flex items-center text-sm font-semibold text-slate-700">
                <User className="w-4 h-4 mr-2 text-indigo-500" />
                Fecha de Nacimiento
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700 font-medium"
                />
                <CalendarHeart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* Appointment Date Input */}
            <div className="space-y-2">
              <label htmlFor="appointmentDate" className="flex items-center text-sm font-semibold text-slate-700">
                <CalendarDays className="w-4 h-4 mr-2 text-indigo-500" />
                Fecha de la Cita
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="appointmentDate"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700 font-medium"
                />
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
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
                <div className="bg-indigo-50 p-4 rounded-2xl text-center border border-indigo-100">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">{age.years}</div>
                  <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Años</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-2xl text-center border border-indigo-100">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">{age.months}</div>
                  <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Meses</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-2xl text-center border border-indigo-100">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">{age.days}</div>
                  <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Días</div>
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
      </motion.div>
    </div>
  );
}
