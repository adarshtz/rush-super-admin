import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableFeatureItemProps {
  id: string;
  feature: string;
  onRemove: () => void;
}

const SortableFeatureItem: React.FC<SortableFeatureItemProps> = ({
  id,
  feature,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm mb-2",
        isDragging && "opacity-50 bg-slate-200 shadow-md"
      )}
    >
      <button
        type="button"
        className="mr-2 cursor-grab text-slate-500 hover:text-slate-700 focus:outline-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={14} />
      </button>
      <span className="flex-1 truncate">{feature}</span>
      <button
        type="button"
        onClick={onRemove}
        className="ml-2 text-slate-500 hover:text-slate-700 focus:outline-none"
      >
        <X size={14} />
      </button>
    </div>
  );
};

interface SortableFeatureListProps {
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}

export function SortableFeatureList({
  features,
  setFeatures,
  className,
}: SortableFeatureListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFeatures((items) => {
        const oldIndex = items.findIndex((item) => item === active.id);
        const newIndex = items.findIndex((item) => item === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  return (
    <div className={className}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={features}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <SortableFeatureItem
                key={feature}
                id={feature}
                feature={feature}
                onRemove={() => removeFeature(index)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
