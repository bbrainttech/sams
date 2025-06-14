import { useState } from "react";
import { Link } from "react-router-dom";
import ClassList from "./components/class/class-list";
import CreateStudentForm from "./components/student/create-student-form";
import { Button, buttonVariants } from "./components/ui/button";

function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <section>
      <div className="container py-20 max-w-lg">
        <div className="flex my-4 justify-between">
          <h1 className="font-bold text-2xl">Class list</h1>
          <div className="flex gap-2">
            <Link
              to={"/class"}
              className={buttonVariants({ variant: "secondary" })}
            >
              Create class
            </Link>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>Add</Button>
            )}
            {showForm && (
              <Button onClick={() => setShowForm(false)}>Cancel</Button>
            )}
          </div>
        </div>

        {showForm && <CreateStudentForm />}

        <ClassList />
      </div>
    </section>
  );
}

export default App;
