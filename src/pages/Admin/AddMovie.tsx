import { memo, useCallback, useState } from "react";
import {
  useForm,
  FormProvider,
  Controller,
  type SubmitHandler,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import {
  Film,
  Star,
  Link2,
  Clock,
  BookOpen,
  Users,
  Clapperboard,
 
  Loader,
} from "lucide-react";
import { addMovieSchema, type AddMovieSchemaType } from "../../validation/index";
import { showToast } from "../../utils/CustomToast";
import { useAddMovie } from "../../hooks/Admin/useAddMovie";
import FormField, { inputCls } from "../../components/Admin/AddMovie/FormField";
import PosterUpload from "../../components/Admin/AddMovie/PosterUpload";
import CategorySelect from "../../components/Admin/AddMovie/CategorySelect";
import MovieSlots from "../../components/Admin/AddMovie/MovieSlots";
import MediaUploadSection from "../../components/Admin/AddMovie/MediaUploadSection";
import type { IAddMoviePayload, IPhotoFile, MovieCategory, MovieType } from "../../types";

const MOVIE_TYPES: { value: MovieType; label: string }[] = [
  { value: "normal",         label: "Normal" },
  { value: "featured",       label: "Featured" },
  { value: "coming-soon",    label: "Coming Soon" },
  { value: "latest-trailer", label: "Latest Trailers" },
];

const AUDITORIUMS = ["Audi 1", "Audi 2", "Audi 3", "Audi 4", "Audi 5"];

const DEFAULT_VALUES: AddMovieSchemaType = {
  type:            "normal",
  movieName:       "",
  categories:      [],
  duration:        0,
  seatPrices: {
    standard: 0,
    recliner: 0,
  },
  auditorium:      "",
  trailerUrl:      "",
  rating:          0,
  slots:           [{ date: "", time: "", ampm: "AM" }],
  story:           "",
};


const SectionCard = memo(function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] p-6 flex flex-col gap-5"
    >
      <div className="flex items-center gap-2.5 pb-1 border-b border-white/6">
        <div className="w-7 h-7 rounded-lg bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.22)] flex items-center justify-center shrink-0">
          <Icon size={14} className="text-[#D4A853]" strokeWidth={1.8} />
        </div>
        <h2 className="text-[13px] font-semibold tracking-[0.06em] uppercase text-white/70">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
});

const AddMoviePage = () => {
  const [poster, setPoster]     = useState<File | null>(null);
  const [castPhotos, setCast]   = useState<IPhotoFile[]>([]);
  const [directorPhotos, setDir]= useState<IPhotoFile[]>([]);
  const [producerPhotos, setProd]= useState<IPhotoFile[]>([]);

  const methods = useForm<AddMovieSchemaType>({
    resolver:      yupResolver(addMovieSchema),
    defaultValues: DEFAULT_VALUES,
    mode:          "onSubmit",
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const resetAll = useCallback(() => {
    reset(DEFAULT_VALUES);
    setPoster(null);
    setCast([]);
    setDir([]);
    setProd([]);
  }, [reset]);

  const { mutate, isPending } = useAddMovie(resetAll);

  const onSubmit: SubmitHandler<AddMovieSchemaType> = useCallback(
    (data) => {
      if (!poster) {
        showToast.warning("Please upload a movie poster");
        return;
      }
      const fullData = {
        ...data,
        poster,
        castPhotos,
        directorPhotos,
        producerPhotos,
      };
      mutate(fullData as IAddMoviePayload);
    },
    [mutate, poster, castPhotos, directorPhotos, producerPhotos]
  );

  return (
    <FormProvider {...methods}>
      <div className="max-w-5xl mx-auto py-4 px-2 sm:px-0">

        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4A853]/70 mb-1">
              Admin Panel
            </p>
            <h1 className="text-3xl font-bold text-white font-['Georgia','Times_New_Roman',serif] leading-tight">
              Add New Movie
            </h1>
          </div>

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {MOVIE_TYPES.map(({ value, label }) => {
                  const active = field.value === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => field.onChange(value)}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide border transition-all duration-200 select-none ${
                        active
                          ? "bg-[rgba(212,168,83,0.15)] border-[rgba(212,168,83,0.55)] text-[#D4A853]"
                          : "bg-white/4 border-white/10 text-white/40 hover:text-white/65"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">


            <div className="flex flex-col gap-6">
             
              <PosterUpload
                value={poster}
                onChange={setPoster}
                error={!poster && errors.movieName ? undefined : undefined}
              />

            
              <SectionCard icon={Clock} title="Duration">
                <FormField label="Duration (min)" required error={errors.duration?.message} htmlFor="duration">
                  <input
                    id="duration"
                    type="number"
                    min={0}
                    {...register("duration", { valueAsNumber: true })}
                    className={inputCls(errors.duration?.message)}
                    placeholder="180"
                  />
                </FormField>
              </SectionCard>
            </div>

        
            <div className="flex flex-col gap-6">

              <SectionCard icon={Film} title="Movie Info">
                <div className="flex flex-col gap-4">

                  <FormField label="Movie Name" required error={errors.movieName?.message} htmlFor="movieName">
                    <input
                      id="movieName"
                      type="text"
                      {...register("movieName")}
                      className={inputCls(errors.movieName?.message)}
                      placeholder="e.g. Interstellar"
                    />
                  </FormField>

                  <Controller
                    control={control}
                    name="categories"
                    render={({ field }) => (
                      <CategorySelect
                        value={field.value as MovieCategory[]}
                        onChange={field.onChange}
                        error={errors.categories?.message}
                      />
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Standard Seat Price" required error={errors.seatPrices?.standard?.message} htmlFor="standardPrice">
                      <input
                        id="standardPrice"
                        type="number"
                        min={0}
                        {...register("seatPrices.standard", { valueAsNumber: true })}
                        className={inputCls(errors.seatPrices?.standard?.message)}
                        placeholder="120"
                      />
                    </FormField>
                    <FormField label="Recliner Seat Price" required error={errors.seatPrices?.recliner?.message} htmlFor="reclinePrice">
                      <input
                        id="reclinePrice"
                        type="number"
                        min={0}
                        {...register("seatPrices.recliner", { valueAsNumber: true })}
                        className={inputCls(errors.seatPrices?.recliner?.message)}
                        placeholder="200"
                      />
                    </FormField>
                  </div>

                  <FormField label="Auditorium" required error={errors.auditorium?.message} htmlFor="auditorium">
                    <select
                      id="auditorium"
                      {...register("auditorium")}
                      className={`${inputCls(errors.auditorium?.message)} cursor-pointer`}
                    >
                      <option value="" className="bg-[#0F0F1A] text-white/50">Select auditorium…</option>
                      {AUDITORIUMS.map((a) => (
                        <option key={a} value={a} className="bg-[#0F0F1A] text-white">{a}</option>
                      ))}
                    </select>
                  </FormField>
                </div>
              </SectionCard>

            
              <SectionCard icon={Star} title="Media & Rating">
                <div className="flex flex-col gap-4">
                  <FormField label="Trailer URL" required error={errors.trailerUrl?.message} htmlFor="trailerUrl">
                    <div className="relative">
                      <Link2
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                        strokeWidth={2}
                      />
                      <input
                        id="trailerUrl"
                        type="url"
                        {...register("trailerUrl")}
                        className={`${inputCls(errors.trailerUrl?.message)} pl-9`}
                        placeholder="https://youtube.com/watch?v=…"
                      />
                    </div>
                  </FormField>

                  <FormField
                    label="Rating"
                    required
                    error={errors.rating?.message}
                    htmlFor="rating"
                    hint="From 0 to 10"
                  >
                    <input
                      id="rating"
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      {...register("rating", { valueAsNumber: true })}
                      className={inputCls(errors.rating?.message)}
                      placeholder="8.5"
                    />
                  </FormField>
                </div>
              </SectionCard>

        
              <SectionCard icon={Clapperboard} title="Movie Slots">
                <MovieSlots />
              </SectionCard>

              <SectionCard icon={BookOpen} title="Story / Synopsis">
                <FormField label="Synopsis" required error={errors.story?.message} htmlFor="story">
                  <textarea
                    id="story"
                    rows={5}
                    {...register("story")}
                    className={`${inputCls(errors.story?.message)} resize-none`}
                    placeholder="Write the movie synopsis here…"
                  />
                </FormField>
              </SectionCard>

              <SectionCard icon={Users} title="Cast & Crew Photos">
                <div className="flex flex-col gap-5">
                  <div className="h-px bg-white/5" />
                  <MediaUploadSection
                    label="Cast Photos"
                    value={castPhotos}
                    onChange={setCast}
                  />
                  <div className="h-px bg-white/5" />
                  <MediaUploadSection
                    label="Director Photos"
                    value={directorPhotos}
                    onChange={setDir}
                  />
                  <div className="h-px bg-white/5" />
                  <MediaUploadSection
                    label="Producer Photos"
                    value={producerPhotos}
                    onChange={setProd}
                  />
                </div>
              </SectionCard>

  
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.button
                  type="submit"
                  disabled={isPending}
                  whileHover={{ scale: isPending ? 1 : 1.02, boxShadow: "0 0 32px rgba(212,168,83,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3 px-6 rounded-xl font-bold text-[13px] tracking-[0.08em] uppercase text-[#1A1A2E] bg-linear-to-br from-[#D4A853] via-[#F0C97A] to-[#B8892F] disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-200"
                >
                  {isPending ? (
                    <>
                      <Loader size={15} className="animate-spin" />
                      Adding Movie…
                    </>
                  ) : (
                    <>
                      <Film size={15} strokeWidth={2.5} />
                      Add Movie
                    </>
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={resetAll}
                  disabled={isPending}
                  className="px-6 py-3 rounded-xl text-[12px] font-semibold tracking-wide text-white/40 border border-white/10 hover:text-white/65 hover:border-white/20 disabled:opacity-40 transition-all duration-200"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddMoviePage;