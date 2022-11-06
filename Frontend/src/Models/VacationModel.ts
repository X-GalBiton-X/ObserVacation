class VacationModel {
    public id: number;
    public destination: string;
    public description: string;
    public image: FileList;
    public imageName: string;
    public fromDate: string;
    public untilDate: string;
    public price: number;
    public followersCount: number = 0;
    public isFollowing: boolean = false;
}

export default VacationModel;