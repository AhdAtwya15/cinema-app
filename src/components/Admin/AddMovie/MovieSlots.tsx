import { memo, useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { inputCls } from "./FormField";
import type { AddMovieSchemaType } from "../../../validation/index";


interface SlotRowProps {
  index: number;
  onRemove: (i: number) => void;
  canRemove: boolean;
}

const SlotRow = memo(function SlotRow({ index, onRemove, canRemove }: SlotRowProps) {
  const methods = useFormContext<AddMovieSchemaType>();
  const {
    register,
    setValue,
    formState: { errors },
  } = methods;

  const slotErrors = errors.slots?.[index];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1,  y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 items-start"
    >

      <div className="flex flex-col gap-1">
        <input
          type="date"
          {...register(`slots.${index}.date`)}
          className={`${inputCls(slotErrors?.date?.message)} scheme-dark`}
        />
        {slotErrors?.date && (
          <p className="text-[11px] text-red-400">{slotErrors.date.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="time"
          {...register(`slots.${index}.time`)}
          onChange={(e) => {
            const val = e.target.value; 
            if (!val) return;
            const [h, m] = val.split(":");
            let hours = parseInt(h);
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
            const displayTime = `${hours.toString().padStart(2, "0")}:${m}`;
            
            setValue(`slots.${index}.time`, displayTime, { shouldValidate: true });
            setValue(`slots.${index}.ampm`, ampm, { shouldValidate: true });
          }}
          className={`${inputCls(slotErrors?.time?.message)} scheme-dark`}
        />
        {slotErrors?.time && (
          <p className="text-[11px] text-red-400">{slotErrors.time.message}</p>
        )}
      </div>

     
      <button
        type="button"
        disabled={!canRemove}
        onClick={() => onRemove(index)}
        className="mt-0.5 w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/30 hover:border-red-500/40 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <Trash2 size={14} strokeWidth={2} />
      </button>
    </motion.div>
  );
});


const MovieSlots = memo(function MovieSlots() {
  const { control, formState: { errors } } = useFormContext<AddMovieSchemaType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "slots",
  });

  const addSlot = useCallback(
    () => append({ date: "", time: "", ampm: "AM" }),
    [append]
  );

  const removeSlot = useCallback((i: number) => remove(i), [remove]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white/60">
          Movie Slots<span className="text-[#D4A853] ml-0.5">*</span>
        </label>
        <button
          type="button"
          onClick={addSlot}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide text-[#D4A853] border border-[rgba(212,168,83,0.3)] bg-[rgba(212,168,83,0.06)] hover:bg-[rgba(212,168,83,0.12)] transition-all duration-200"
        >
          <Plus size={12} strokeWidth={2.5} />
          Add Slot
        </button>
      </div>

      <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-0.5">
        <span>Date</span>
        <span>Time Picker</span>
        <span className="w-9" />
      </div>

      <AnimatePresence initial={false}>
        {fields.map((field, index) => (
          <SlotRow
            key={field.id}
            index={index}
            onRemove={removeSlot}
            canRemove={fields.length > 1}
          />
        ))}
      </AnimatePresence>

      {typeof errors.slots?.message === "string" && (
        <p className="text-[11px] text-red-400 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400 shrink-0" />
          {errors.slots.message}
        </p>
      )}
    </div>
  );
});

export default MovieSlots;
