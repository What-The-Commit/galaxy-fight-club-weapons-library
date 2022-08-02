export interface IWeapon {
    "Bound to Fighter": string;
    Name:               string;
    Tier:               string;
    Type:               string;
    "Range (1-6)":      number;
    "AA Type":          string;
    "AA Amount":        number;
    "AA Damage":        number;
    "Ult Type":         string;
    "Ult Damage":       number | string;
    "Special Amount":   number | string;
    "Special Type":     string;
    Video:              string;
    Image:              string;
}