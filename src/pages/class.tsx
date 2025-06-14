import CreateClassForm from "../components/class/create-class-form";

export default function ClassPage() {
  return (
    <section>
      <div className="container max-w-lg space-y-5 py-28">
        <h1 className="font-bold text-3xl">Class</h1>

        <CreateClassForm />
      </div>
    </section>
  );
}
