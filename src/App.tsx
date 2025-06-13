import { useState } from "react";
import CreateClassForm from "./components/class/create-class-form";
import { Button } from "./components/ui/button";
import CreateStudentForm from "./components/student/create-student-form";
import ClassList from "./components/class/class-list";

function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <section>
      <div className="container py-20 max-w-lg">
        <div className="flex my-4 justify-between">
          <h1 className="font-bold text-2xl">Class list</h1>
          <div className="flex gap-2">
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
        {/* <CreateClassForm /> */}
      </div>
    </section>
  );
}

export default App;
