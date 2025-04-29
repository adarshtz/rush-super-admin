import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { subscriptionSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SortableFeatureList } from "./sortable-feature-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DurationType = "Days" | "Month" | "Year";

export function CreateSubscriptionDialog() {
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [durationType, setDurationType] = useState<DurationType>("Year");
  const [durationValue, setDurationValue] = useState<number>(1);

  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      features: [],
      isActive: true,
      duration: "1 Year",
    },
  });

  // Update the form value whenever features change (due to drag and drop)
  useEffect(() => {
    form.setValue("features", features);
  }, [features, form]);

  const addFeature = () => {
    if (newFeature.trim() !== "") {
      const updatedFeatures = [...features, newFeature.trim()];
      setFeatures(updatedFeatures);
      setNewFeature("");
    }
  };

  const handleDurationChange = (type: DurationType) => {
    setDurationType(type);
    form.setValue("duration", `${durationValue} ${type}`);
  };

  const handleDurationValueChange = (value: number) => {
    setDurationValue(value);
    form.setValue("duration", `${value} ${durationType}`);
  };

  function onSubmit(values: z.infer<typeof subscriptionSchema>) {
    // Simulate API call with console.log
    console.log("Subscription form values:", values);

    // Optional: Simulate API call success
    console.log("Subscription created successfully!");

    // Reset form
    form.reset();
    setFeatures([]);
    setNewFeature("");
    setDurationValue(1);
    setDurationType("Year");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">Create New Subscription</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-semibold">
            Create Subscription
          </DialogTitle>
          <DialogDescription>
            Add a new subscription plan to your system
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Premium Plan"
                        {...field}
                        className="h-10"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      The name of your subscription plan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="99.99"
                        {...field}
                        className="h-10"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Monthly price in dollars
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Access to all premium features"
                        {...field}
                        className="h-10"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      A short description of this plan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={() => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <div className="flex space-x-2 items-center">
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          value={durationValue}
                          onChange={(e) =>
                            handleDurationValueChange(
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-20 h-10"
                        />
                      </FormControl>
                      <Select
                        value={durationType}
                        onValueChange={(value) =>
                          handleDurationChange(value as DurationType)
                        }
                      >
                        <SelectTrigger className="w-32 h-10">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Days">Days</SelectItem>
                          <SelectItem value="Month">Month</SelectItem>
                          <SelectItem value="Year">Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormDescription className="text-xs">
                      Subscription duration
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm h-[72px]">
                    <div className="space-y-0.5">
                      <FormLabel>Active</FormLabel>
                      <FormDescription className="text-xs">
                        Mark this subscription as active
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="features"
                render={() => (
                  <FormItem className="col-span-2 mt-2">
                    <FormLabel>Features</FormLabel>
                    <FormDescription className="text-xs">
                      Add key features included in this plan. Drag to reorder
                      features by priority.
                    </FormDescription>
                    <div className="space-y-4 mt-2">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a feature"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addFeature();
                            }
                          }}
                          className="h-10"
                        />
                        <Button
                          type="button"
                          onClick={addFeature}
                          className="h-10"
                        >
                          Add
                        </Button>
                      </div>

                      {features.length > 0 && (
                        <div className="bg-slate-50 p-3 rounded-md border mt-2">
                          <div className="text-sm font-medium mb-2">
                            Features (drag to reorder):
                          </div>
                          <SortableFeatureList
                            features={features}
                            setFeatures={setFeatures}
                          />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Subscription</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
