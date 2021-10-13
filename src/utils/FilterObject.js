class FilterObject {
  static filterBy(query, arrOfObj) {
    const filteredArr = arrOfObj.filter((obj) => {
      const lowerCaseTitle = obj.title.toLowerCase();
      const lowerCaseContent = obj.content.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      if (lowerCaseTitle.includes(lowerCaseQuery) || lowerCaseContent.includes(lowerCaseQuery)) {
        return obj;
      }
      return false;
    });
    return filteredArr;
  }
}

module.exports = FilterObject;