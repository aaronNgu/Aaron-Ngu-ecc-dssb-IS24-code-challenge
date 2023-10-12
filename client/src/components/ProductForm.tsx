import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IProduct, Methodology } from "../services/models";
import { Button, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Typography } from "@mui/joy";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers-pro/AdapterMoment";
import NameList from "./DeveloperList";
import moment from "moment";
import { useAddProductMutation, useEditProductMutation } from "../services/api";
import { toast } from "react-toastify";
import { useEffect } from "react";



export interface ProductFormParam {
    prod?: IProduct,
    handleDone: Function,
}

export const ProductForm = ({ prod, handleDone }: ProductFormParam) => {
    const [addProduct] = useAddProductMutation();
    const [editProduct] = useEditProductMutation();
    const { register, handleSubmit, formState: { errors, isValid, defaultValues }, control, setValue, setError, reset } = useForm<IProduct>({
        defaultValues:
        {
            productId: 0,
            productName: '',
            productOwnerName: '',
            Developers: [],
            scrumMasterName: '',
            startDate: "2014-03-19T06:38:31+07:00",
            methodology: Methodology.AGILE,
            location: ''
        }
    })
    useEffect(() => {
        if (prod) {
            reset(prod);
        }
    }, [prod, reset]);

    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        if (data.Developers.length <= 0) {
            toast.error('Each product must have at least one Developer');
            return;
        }
        if (isValid) {
            if (prod) {
                await editProduct(data)
                    .unwrap()
                    .then(() => {
                        toast.success('Successfully updated product!', { autoClose: 2000 });
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error('Something went wrong with updating your product. Please try again later.');
                    });
            } else {
                await addProduct(data)
                    .unwrap()
                    .then(() => {
                        toast.success('Successfully added product!', { autoClose: 2000 });
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error('Something went wrong with adding your product. Please try again later.');
                    });
            }
            handleDone();
        }
    }

    const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        if (e.key === 'Enter' && !['TEXTAREA'].includes(target.tagName)) {
            e.preventDefault();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={preventEnterKeySubmission}>
            <Stack spacing={3} margin={3}>
                <input {...register('productId')} type='hidden' disabled />
                <FormControl>
                    <FormLabel>Product Name</FormLabel>
                    <Input size="lg" sx={{ width: 256 }} placeholder="BC Parks Website"  {...register('productName', { required: true })} />
                    {errors.productName?.type === "required" && (
                        <Typography color="danger">Product name is required</Typography>
                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>Product Owner</FormLabel>
                    <Input sx={{ width: 256 }} size="lg" placeholder="Adam Sandler"  {...register('productOwnerName', { required: true })} />
                    {errors.productOwnerName?.type === "required" && (
                        <Typography color="danger">Product owner is required</Typography>
                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>Scrum Master</FormLabel>
                    <Input sx={{ width: 256 }} size="lg" placeholder="Linda Song"  {...register('scrumMasterName', { required: true })} />
                    {errors.scrumMasterName?.type === "required" && (
                        <Typography color="danger">Scrum master is required</Typography>
                    )}
                </FormControl>
                <div>
                    <NameList developers={defaultValues?.Developers ? defaultValues.Developers as string[] : []} onListChange={(newlist) => {
                        setValue('Developers', newlist);
                        if (newlist.length <= 0) setError('Developers', { type: "minLength" });
                    }} />
                    <input {...register('Developers', { validate: (value, formValues) => value.length >= 0 })} type='hidden' />
                    {errors.Developers && (
                        <Typography color="danger">Must have at least one dev</Typography>
                    )}
                </div>
                <FormControl>
                    <FormLabel>Start date</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <Controller
                            name="startDate"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <DatePicker
                                    sx={{ width: 256 }}
                                    onChange={(date) => field.onChange(date?.toISOString())}
                                    value={moment(field.value)}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    {errors.startDate && (
                        <Typography color="danger">Start date must be provided</Typography>
                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>Methodology</FormLabel>
                    <RadioGroup defaultValue="Agile" >
                        <Radio value="Agile" label="Agile" {...register('methodology')} />
                        <Radio value="Waterfall" label="Waterfall" {...register('methodology')} />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Input size="lg" sx={{ width: 256 }} placeholder="https://github.com/bcgov" {...register('location', { required: true })} />
                    {errors.location?.type === "required" && (
                        <Typography color="danger">Link to the project is required</Typography>
                    )}
                </FormControl>
                <Button type="submit" variant="soft" size="lg" sx={{ width: 256 }}> {prod ? 'Update' : 'Add'} Product </Button >
            </Stack>
        </form>

    );
}