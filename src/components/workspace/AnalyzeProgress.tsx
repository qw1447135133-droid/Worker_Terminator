import { CheckCircle2, XCircle, Loader2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type AnalyzePhase = "idle" | "phase1" | "phase1-done" | "phase1-failed";

interface AnalyzeProgressProps {
  phase: AnalyzePhase;
  phase1Info?: string;
}

const AnalyzeProgress = ({
  phase,
  phase1Info,
}: AnalyzeProgressProps) => {
  if (phase === "idle") return null;

  const phase1Done = phase === "phase1-done";
  const phase1Failed = phase === "phase1-failed";
  const phase1Active = phase === "phase1";

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div className="text-sm font-medium text-foreground">解析进度</div>

      {/* Phase 1 */}
      <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${
          phase1Done ? "bg-primary/15 text-primary" : phase1Failed ? "bg-destructive/15 text-destructive" : "bg-accent text-accent-foreground"
        }`}>
          {phase1Active ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : phase1Done ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : phase1Failed ? (
            <XCircle className="h-3.5 w-3.5" />
          ) : (
            <Clock className="h-3.5 w-3.5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-medium ${phase1Done ? "text-primary" : phase1Failed ? "text-destructive" : phase1Active ? "text-foreground" : "text-muted-foreground"}`}>
            识别角色与场景
          </div>
          <AnimatePresence mode="wait">
            {phase1Info && (
              <motion.div
                key={phase1Info}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-muted-foreground mt-0.5"
              >
                {phase1Info}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeProgress;
