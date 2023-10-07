import { WatchedList } from './watched-list'

class NumbersWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('@core/watched-list', () => {
  it('should be able to create a new watched list', () => {
    const watchedList = new NumbersWatchedList([1, 2, 3])

    expect(watchedList.currentItems).toEqual([1, 2, 3])
    expect(watchedList.currentItems).toHaveLength(3)
  })

  it('should be able to add a new item to the watched list', () => {
    const watchedList = new NumbersWatchedList([1, 2, 3])

    watchedList.add(4)

    expect(watchedList.currentItems).toHaveLength(4)
    expect(watchedList.getNewItems()).toHaveLength(1)
  })

  it('should be able to remove a item from the watched list', () => {
    const watchedList = new NumbersWatchedList([1, 2, 3])

    watchedList.remove(2)

    expect(watchedList.currentItems).toHaveLength(2)
    expect(watchedList.getRemovedItems()).toHaveLength(1)
  })

  it('should be able to remove an previously added item from the watched list', () => {
    const watchedList = new NumbersWatchedList([1, 2, 3])

    watchedList.add(4)
    watchedList.remove(4)

    expect(watchedList.currentItems).toHaveLength(3)
    expect(watchedList.getRemovedItems()).toHaveLength(0)
  })

  it('should be able to add an previously removed item from the watched list', () => {
    const watchedList = new NumbersWatchedList([1, 2, 3])

    watchedList.remove(2)
    watchedList.add(2)

    expect(watchedList.currentItems).toHaveLength(3)
    expect(watchedList.getNewItems()).toHaveLength(0)
  })

  it('should be able to updated the watched list', () => {
    const watchedList = new NumbersWatchedList([1, 2, 3])

    watchedList.update([1, 4, 2, 5])

    expect(watchedList.currentItems).toHaveLength(4)
    expect(watchedList.getNewItems()).toEqual([4, 5])
    expect(watchedList.getRemovedItems()).toEqual([3])
  })
})
