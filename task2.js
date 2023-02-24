const Company = function (name, salary) {
    
  this.income = (value) => {
    let sum = value - salary;
    Company.store.money += sum;
    let found = Company.store.staffList.find(element => element.name === name);
    found.income += sum;
  };

  this.spend = (value) => {
    Company.store.money -= value;
    let found = Company.store.staffList.find(element => element.name === name);
    found.income -= value;
  };

  Company.addStaff({name: name, income: 0});
};

Company.store = {
  staffList: [],
  countStaff: 0,
  money: 0,
};

Company.addStaff = (person) => {
  Company.store.staffList.push(person);
  Company.store.countStaff += 1;
};

Company.getLeaders = () => {
  const staffArray = Company.store.staffList;
  let max = 0;
  for (let i = 0; i < staffArray.length; i++) {
    max = Math.max(staffArray[i].income, max);
  }
  const result = staffArray.filter((element) => element.income === max);
  return result;
};
