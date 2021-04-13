const getTop30 = (usersData:any) => {
    return usersData.sort((a:any, b:any) => b.points.total-a.points.total).slice(0,30);
}
export default getTop30;
