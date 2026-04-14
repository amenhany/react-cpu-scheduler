import { useState, type ChangeEvent } from 'react';
import { useScheduler } from './SchedulingContext';
import '@/styles/table.css';

export default function ProcessTable({}: {}) {
   const { state, addProcess, removeProcess, algorithm, started } = useScheduler();
   const processes = state?.processes ?? [];
   const [visibleForm, setVisibleForm] = useState(false);
   const [form, setForm] = useState<Process>({
      arrivalTime: 0,
      burstTime: 0,
      remainingTime: 0,
      priority: 0,
   });

   function handleChange(evt: ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
         ...prev,
         [evt.target.name]: evt.target.value.trim(),
      }));
   }

   function submitForm() {
      if (form.arrivalTime < 0 || form.burstTime <= 0) return;
      addProcess({
         ...form,
         remainingTime: form.burstTime,
         arrivalTime: started && state ? state.currentTime : form.arrivalTime,
      });
      setVisibleForm(false);
   }

   return (
      <div className="form-wrapper">
         <div className="table-wrapper">
            <table>
               <thead>
                  <tr>
                     <th scope="col">PID</th>
                     <th scope="col">Arrival Time</th>
                     <th scope="col">Burst Time</th>
                     {(algorithm === 'pr' || algorithm === 'ppr') && (
                        <th scope="col">Priority</th>
                     )}
                     <th scope="col">{started && 'Remaining Time'}</th>
                  </tr>
               </thead>
               <tbody>
                  {processes.map((p, i) => (
                     <tr key={`P${i}`}>
                        <th scope="row" className="pidCell">
                           P{i}
                        </th>
                        <th className="numCell">{p.arrivalTime}</th>
                        <th className="numCell">{p.burstTime}</th>
                        {(algorithm === 'pr' || algorithm === 'ppr') && (
                           <th className="numCell">{p.priority}</th>
                        )}
                        <th>
                           {!started ? (
                              <button
                                 onClick={() => removeProcess(i)}
                                 className="delete-button"
                              >
                                 ✖︎
                              </button>
                           ) : (
                              <>{p.remainingTime}</>
                           )}
                        </th>
                     </tr>
                  ))}
                  {visibleForm && (
                     <tr key={`P${processes.length}`} className="formRow">
                        <th scope="row">P{processes.length}</th>
                        <th>
                           {started && state ? (
                              state.currentTime
                           ) : (
                              <input
                                 type="number"
                                 name="arrivalTime"
                                 id="arrivalTime"
                                 min={1}
                                 value={form.arrivalTime}
                                 onChange={handleChange}
                              />
                           )}
                        </th>
                        <th>
                           <input
                              type="number"
                              name="burstTime"
                              id="burstTime"
                              min={1}
                              value={form.burstTime}
                              onChange={handleChange}
                           />
                        </th>
                        {(algorithm === 'pr' || algorithm === 'ppr') && (
                           <th>
                              <input
                                 type="number"
                                 name="priority"
                                 id="priority"
                                 value={form.priority}
                                 onChange={handleChange}
                              />
                           </th>
                        )}
                        <th>
                           <button
                              onClick={() => setVisibleForm(false)}
                              className="delete-button"
                           >
                              ✖︎
                           </button>
                        </th>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
         <button
            className="add-button"
            onClick={() => {
               if (visibleForm) submitForm();
               else setVisibleForm(true);
            }}
         >
            {visibleForm ? '✔︎' : '+'}
         </button>
      </div>
   );
}
