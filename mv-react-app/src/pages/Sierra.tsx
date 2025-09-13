import { useEffect, useState } from 'react';
import type { Person } from '@/types/person';

const Sierra = () => {
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const sierraPerson: Person = {
      name: 'Sierra Welsch',
      major: 'Computer Science',
      fun_fact: 'I skipped kindergarten!',
      favorite_restaurant_in_boston: 'MalaTown in Allston',
    };

    setPerson(sierraPerson);
  }, []);

  return (
    <div>
      <h1>My name is {person?.name}!</h1>
      <h2> I am majoring in {person?.major} </h2>
      <h2> A fun fact about me is {person?.fun_fact} </h2>
      <h2>
        {' '}
        My favorite restaurant in Boston is{' '}
        {person?.favorite_restaurant_in_boston} :D{' '}
      </h2>
    </div>
  );
};

export default Sierra;
