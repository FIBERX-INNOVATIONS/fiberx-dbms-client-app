<template>
    <div :class="props.section_wrapper_class_style">
        <ColumnsSectionUI :content_data="props.content_data" :columns="props.columns_defintion" />
        <IndexesSectionUI :content_data="props.content_data" :columns="props.columns_defintion" :indexes="props.indexes_definition" />
    </div>
</template>


<script setup lang="ts">
import SchemaDesignerUIProps       from "./schema_designer_ui_props";
import SchemaDesignerUIController  from "./schema_designer_ui_controller";

const props            = defineProps(SchemaDesignerUIProps);
const controller       = new SchemaDesignerUIController(props);

const { state_refs, components }                = controller.getComponentDefinition();
const { ColumnsSectionUI, IndexesSectionUI }    = components;
</script>