import '@/styles/gantt.css';
import { useScheduler } from './SchedulingContext';

export default function GanttChart() {
   const { state } = useScheduler();

   if (!state || state.timeline.length === 0) {
      return (
         <div className="gantt-chart-container">
            <h3>Execution Timeline</h3>
            <div className="gantt-chart-empty">
               <p>
                  No execution data available. Add processes and start scheduling to see
                  the timeline.
               </p>
            </div>
         </div>
      );
   }

   const maxTime = Math.max(...state.timeline.map((segment) => segment.to));
   const processColors = [
      '#3b82f6',
      '#ef4444',
      '#10b981',
      '#f59e0b',
      '#8b5cf6',
      '#06b6d4',
      '#f97316',
      '#84cc16',
      '#ec4899',
      '#6366f1',
   ];

   const getProcessColor = (pid: number) => {
      return processColors[pid % processColors.length];
   };

   const formatTime = (time: number) => {
      return time.toString();
   };

   return (
      <div className="gantt-chart-container">
         <h3>Execution Timeline</h3>
         <div className="gantt-chart">
            <div className="gantt-header">
               <div className="process-label">Time</div>
               <div className="timeline-header">
                  {Array.from({ length: maxTime + 1 }, (_, i) => (
                     <div key={i} className="time-label">
                        {formatTime(i)}
                     </div>
                  ))}
               </div>
            </div>

            <div className="gantt-body">
               <div className="process-row">
                  <div className="process-label">Process</div>
                  <div className="timeline-row">
                     <div className="timeline-background">
                        {Array.from({ length: maxTime }, (_, i) => (
                           <div key={i} className="time-unit" />
                        ))}
                     </div>
                     <div className="timeline-segments">
                        {state.timeline.map((segment, index) => (
                           <div
                              key={index}
                              className="timeline-segment"
                              style={{
                                 left: `${segment.from * 40}px`,
                                 width: `${(segment.to - segment.from) * 40}px`,
                                 backgroundColor: getProcessColor(segment.pid),
                              }}
                              title={`Process ${segment.pid}: ${segment.from} - ${segment.to}`}
                           >
                              {segment.to - segment.from > 1 && (
                                 <span className="segment-label">P{segment.pid}</span>
                              )}
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="gantt-legend">
            <h4>Legend:</h4>
            <div className="legend-items">
               {state.processes.map((process) => (
                  <div key={process.pid} className="legend-item">
                     <div
                        className="legend-color"
                        style={{ backgroundColor: getProcessColor(process.pid) }}
                     />
                     <span>
                        P{process.pid} (Burst: {process.burstTime})
                     </span>
                  </div>
               ))}
            </div>
         </div>

         <div className="gantt-stats">
            <h4>Statistics:</h4>
            <div className="stats-grid">
               <div className="stat-item">
                  <span className="stat-label">Average Waiting Time:</span>
                  <span className="stat-value">{state.avgWait.toFixed(2)}</span>
               </div>
               <div className="stat-item">
                  <span className="stat-label">Average Turnaround Time:</span>
                  <span className="stat-value">{state.avgTurn.toFixed(2)}</span>
               </div>
               <div className="stat-item">
                  <span className="stat-label">Total Time:</span>
                  <span className="stat-value">{state.currentTime}</span>
               </div>
            </div>
         </div>
      </div>
   );
}
