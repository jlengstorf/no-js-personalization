const products = [
  {
    id: 1,
    name: 'A Loving Corgi',
    description:
      "This corgi just can't contain all the love it has inside. Some of it managed to get free, and now it's caught in its fur.",
    imageSrc:
      'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80&h=400&crop=entropy',
    imageAlt: 'A corgi with hearts on it.',
    category: 'corgis',
    link: '/corgis/loving',
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    description:
      'Since the invention of food, there have been five foods rated the most passionate, the most pure. This one left them all behind.',
    imageSrc:
      'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60&h=400&crop=center',
    imageAlt: 'A pepperoni pizza.',
    category: 'food',
    link: '/food/pizza',
  },
  {
    id: 3,
    name: 'Corgi Buddies',
    description:
      "The thing about wearing a sweater as a dog is that it's only about fashion. You know you'll be warm because you've already got a coat, right?",
    imageSrc:
      'https://images.unsplash.com/photo-1628148366072-3337dd316e17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80&h=400&crop=center',
    imageAlt: 'Two corgis wearing sweaters.',
    category: 'corgis',
    link: '/corgis/buddies',
  },
  {
    id: 4,
    name: 'Cheeseburger',
    description:
      'Done right, a cheeseburger is the ultimate representation of American cuisine: it borrows, extends, and becomes something truly unique and special.',
    imageSrc:
      'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGJ1cmdlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60&h=400&crop=center',
    imageAlt: 'A cheeseburger',
    category: 'food',
    link: '/food/cheeseburger',
  },
  {
    id: 5,
    name: 'Corgi Puppy',
    description:
      'Puppies are almost always adorable. The sneaky thing about corgis is that they stay cute into adulthood â€” mostly due to their fluffy butts.',
    imageSrc:
      'https://images.unsplash.com/photo-1598894591353-9e7c935dd774?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80&h=400&crop=center',
    imageAlt: 'A corgi puppy.',
    category: 'corgis',
    link: '/corgis/puppy',
  },
  {
    id: 6,
    name: 'Iced Donuts',
    description:
      "Donuts are a rare exception to the rule that you shouldn't eat colors that don't occur in nature. Go ahead and chomp on those rainbow sprinkles.",
    imageSrc:
      'https://images.unsplash.com/photo-1624277904878-120554c46c2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvbnV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60&h=400&crop=center',
    imageAlt: 'A donut.',
    category: 'food',
    link: '/food/donut',
  },
];

export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
