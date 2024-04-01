import { GoalItem } from "@/components/initial/GoalItem";
import { GOALS } from "@/started/data/goals";

export default async function GoalsPage() {
  return (
    <main className="w-full p-4">
      <h1 className="text-3xl">Goals</h1>
      <br />
      <section className="grid grid-cols-4 gap-4">
        {
          GOALS.map(goal => (
            <GoalItem key={goal.title} {...goal}/>
      ))
        }
    </section>
    </main >
  );
}
