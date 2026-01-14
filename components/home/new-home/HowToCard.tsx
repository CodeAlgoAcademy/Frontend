interface IProps {
  title: string;
  description: string;
}

export default function HowToCard({ title, description }: IProps) {
  return (
    <div className="rounded-3xl bg-white px-6 py-8 shadow-sm transition hover:shadow-md">
      <h3 className="text-[1.4rem] font-bold max-md:text-[1.1rem]">
        {title}
      </h3>

      <p className="mt-4 text-[.95rem] font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
}
