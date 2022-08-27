import { REACTIONS } from '../constants';

export function getMostPopularReaction(reactions: any[], max = 3) {
  const mostReactions = REACTIONS.map((reaction) => {
    const count = reactions.filter(
      (item) => item.type === reaction.type
    ).length;

    return { ...reaction, count };
  }).sort((a, b) => b.count - a.count);

  return mostReactions.slice(0, max).filter((item) => item.count > 0);
}

export function groupReactions(reactions: any[] = []) {
  const groupedReactions = REACTIONS.map((reaction) => ({
    ...reaction,
    items: reactions.filter((item) => item.type === reaction.type),
    count: reactions.filter((item) => item.type === reaction.type).length,
  }));

  const sortAndFilterReactions = groupedReactions
    .filter((reaction) => reaction.count > 0)
    .sort((a, b) => b.count - a.count);

  return [
    {
      icon: '',
      label: 'Tất cả',
      type: 'all',
      count: reactions.length,
      items: reactions,
    },
    ...sortAndFilterReactions,
  ];
}

export function getReactionImage(type: string) {
  return REACTIONS.find((reaction) => reaction.type === type)?.icon;
}

export function getReactionByType(type: string) {
  return REACTIONS.find((reaction) => reaction.type === type) ?? null;
}
